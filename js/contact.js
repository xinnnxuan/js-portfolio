// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            iam: formData.get('iam'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'SENDING...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        sendEmail(data)
            .then(() => {
                // Success
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                // Error
                console.error('Error sending email:', error);
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
});

function validateForm(data) {
    const errors = [];
    
    if (!data.iam) {
        errors.push('Please select what you are (Athlete, Brand, or Business)');
    }
    
    if (!data.firstName.trim()) {
        errors.push('First name is required');
    }
    
    if (!data.lastName.trim()) {
        errors.push('Last name is required');
    }
    
    if (!data.email.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone.trim()) {
        errors.push('Phone number is required');
    }
    
    if (!data.message.trim()) {
        errors.push('Message is required');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendEmail(data) {
    // Using EmailJS service
    return new Promise((resolve, reject) => {
        // Initialize EmailJS with your service ID
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
        
        const templateParams = {
            from_name: `${data.firstName} ${data.lastName}`,
            from_email: data.email,
            phone: data.phone,
            iam: data.iam,
            message: data.message,
            to_email: 'jacob.r.spence@gmail.com'
        };
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                resolve(response);
            }, function(error) {
                console.log('FAILED...', error);
                reject(error);
            });
    });
}

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-align: center;
        ${type === 'success' 
            ? 'background: rgba(0, 255, 0, 0.1); color: #00ff00; border: 1px solid #00ff00;' 
            : 'background: rgba(255, 0, 0, 0.1); color: #ff0000; border: 1px solid #ff0000;'
        }
    `;
    
    // Insert message after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Alternative method using mailto (fallback)
function sendEmailFallback(data) {
    const subject = `Contact Form Submission from ${data.firstName} ${data.lastName}`;
        const body = `
I AM: ${data.iam.toUpperCase()}
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
    `;
    
    const mailtoLink = `mailto:jacob.r.spence@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Add fallback for when EmailJS is not available
if (typeof emailjs === 'undefined') {
    console.log('EmailJS not loaded, using mailto fallback');
    
    // Override sendEmail function to use mailto
    window.sendEmail = function(data) {
        return new Promise((resolve) => {
            sendEmailFallback(data);
            resolve();
        });
    };
}
