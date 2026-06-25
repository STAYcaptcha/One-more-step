(function() {
    'use strict';

    var verified = false;
    var overlay = null;
    var container = null;
    var targetUrl = '';

    function getCurrentUrl() {
        return window.location.hostname || '';
    }

    function createOverlay() {
        if (document.getElementById('stay-captcha-overlay')) {
            return;
        }

        targetUrl = getCurrentUrl();

        overlay = document.createElement('div');
        overlay.id = 'stay-captcha-overlay';
        overlay.style.cssText = [
            'position: fixed',
            'top: 0',
            'left: 0',
            'width: 100%',
            'height: 100%',
            'background-color: #ffffff',
            'z-index: 999999',
            'display: flex',
            'align-items: flex-start',
            'justify-content: center',
            'padding-top: 1.25rem',
            'overflow: hidden'
        ].join(';');

        var containerDiv = document.createElement('div');
        containerDiv.className = 'stay-captcha-container';
        containerDiv.style.cssText = [
            'width: 100%',
            'max-width: 1000px',
            'padding: 0 20px 40px 20px',
            'position: relative'
        ].join(';');

        var title = document.createElement('h1');
        title.textContent = 'One more step';
        title.style.cssText = [
            'font-weight: 300',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 4.5rem',
            'color: #1a1a1a',
            'margin: 0',
            'text-align: left',
            'margin-left: -60px'
        ].join(';');

        var desc = document.createElement('p');
        var descText = 'Please complete the security check to access ';
        if (targetUrl) {
            descText += targetUrl;
        }
        desc.textContent = descText;
        desc.style.cssText = [
            'font-weight: 300',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 1.6rem',
            'color: #888888',
            'margin: 1rem 0 0 0',
            'text-align: left',
            'margin-left: -60px'
        ].join(';');

        var grayBar = document.createElement('div');
        grayBar.style.cssText = [
            'width: 100vw',
            'height: 500px',
            'background-color: #e0e0e0',
            'margin-top: 2rem',
            'margin-left: calc(-50vw + 50%)',
            'border-radius: 0',
            'position: relative'
        ].join(';');

        var whiteBox = document.createElement('div');
        whiteBox.className = 'white-box';
        whiteBox.style.cssText = [
            'background-color: #ffffff',
            'border-radius: 0',
            'padding: 50px 30px',
            'width: 50%',
            'max-width: 500px',
            'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06)',
            'display: flex',
            'flex-direction: column',
            'align-items: flex-start',
            'justify-content: center',
            'position: absolute',
            'top: 60px',
            'left: calc(20px + (100vw - 1000px) / 2 - 60px)'
        ].join(';');

        container = document.createElement('div');
        container.id = 'stay-captcha-container';
        container.style.cssText = [
            'display: inline-block',
            'width: 420px',
            'max-width: 100%',
            'margin-left: 0'
        ].join(';');

        var submitBtn = document.createElement('button');
        submitBtn.id = 'stay-captcha-submit';
        submitBtn.textContent = 'Submit';
        submitBtn.style.cssText = [
            'background-color: #e0e0e0',
            'color: #000000',
            'border: 1px solid #000000',
            'border-radius: 0',
            'padding: 4px 14px',
            'font-size: 0.75rem',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'cursor: pointer',
            'margin-top: 20px',
            'align-self: flex-start'
        ].join(';');
        submitBtn.onmouseover = function() { this.style.opacity = '0.8'; };
        submitBtn.onmouseout = function() { this.style.opacity = '1'; };

        whiteBox.appendChild(container);
        whiteBox.appendChild(submitBtn);
        grayBar.appendChild(whiteBox);

        var browserIcon = document.createElement('div');
        browserIcon.className = 'browser-icon';
        browserIcon.style.cssText = [
            'position: absolute',
            'top: 60px',
            'right: -40px',
            'width: 50%',
            'height: calc(100% - 60px)',
            'background-color: #ffffff',
            'border-radius: 12px 0 0 0',
            'display: flex',
            'flex-direction: column',
            'align-items: center',
            'justify-content: center',
            'overflow: hidden'
        ].join(';');

        var browserBar = document.createElement('div');
        browserBar.style.cssText = [
            'width: 100%',
            'height: 40px',
            'background-color: #f0f0f0',
            'border-radius: 0',
            'display: flex',
            'align-items: center',
            'padding: 0 16px',
            'gap: 10px',
            'flex-shrink: 0'
        ].join(';');

        var dotColors = ['#ff5f57', '#ffbd2e', '#28c840'];
        for (var i = 0; i < 3; i++) {
            var dot = document.createElement('div');
            dot.style.cssText = [
                'width: 14px',
                'height: 14px',
                'border-radius: 50%',
                'background-color: ' + dotColors[i]
            ].join(';');
            browserBar.appendChild(dot);
        }

        var browserBody = document.createElement('div');
        browserBody.textContent = '⚠️';
        browserBody.style.cssText = [
            'flex: 1',
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'width: 100%',
            'background-color: #ffffff',
            'font-size: 160px',
            'margin-left: -160px'
        ].join(';');

        browserIcon.appendChild(browserBar);
        browserIcon.appendChild(browserBody);
        grayBar.appendChild(browserIcon);

        var bottomRow = document.createElement('div');
        bottomRow.className = 'bottom-row';
        bottomRow.style.cssText = [
            'display: flex',
            'align-items: flex-start',
            'margin-top: 1rem',
            'margin-left: -60px',
            'width: calc(100% + 120px)'
        ].join(';');

        var bottomLeft = document.createElement('div');
        bottomLeft.className = 'bottom-left';
        bottomLeft.style.cssText = [
            'font-weight: 400',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 2rem',
            'color: #000000',
            'text-align: left',
            'width: 50%',
            'max-width: 500px'
        ].join(';');
        bottomLeft.textContent = 'Why do I have to complete a CAPTCHA?';

        var leftSmall = document.createElement('div');
        leftSmall.className = 'bottom-text-small';
        leftSmall.style.cssText = [
            'font-weight: 400',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 1rem',
            'color: #000000',
            'text-align: left',
            'margin-top: 0.5rem',
            'width: 100%'
        ].join(';');
        leftSmall.textContent = 'Completing the CAPTCHA proves you are a human and gives you temporary access to the web property.';
        bottomLeft.appendChild(leftSmall);

        var bottomRight = document.createElement('div');
        bottomRight.className = 'bottom-right';
        bottomRight.style.cssText = [
            'font-weight: 400',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 2rem',
            'color: #000000',
            'text-align: left',
            'width: 50%',
            'max-width: 500px',
            'margin-left: auto'
        ].join(';');
        bottomRight.textContent = 'What can I do to prevent this in the future?';

        var rightSmall1 = document.createElement('div');
        rightSmall1.className = 'bottom-text-small';
        rightSmall1.style.cssText = [
            'font-weight: 400',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 1rem',
            'color: #000000',
            'text-align: left',
            'margin-top: 0.5rem',
            'width: 100%'
        ].join(';');
        rightSmall1.textContent = 'If you are on a personal connection, like at home, you can run an anti-virus scan on your device to make sure it is not infected with malware.';
        bottomRight.appendChild(rightSmall1);

        var rightSmall2 = document.createElement('div');
        rightSmall2.className = 'bottom-text-small';
        rightSmall2.style.cssText = [
            'font-weight: 400',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
            'font-size: 1rem',
            'color: #000000',
            'text-align: left',
            'margin-top: 0.5rem',
            'width: 100%'
        ].join(';');
        rightSmall2.textContent = 'If you are at an office or shared network, you can ask the network administrator to run a scan across the network looking for';
        bottomRight.appendChild(rightSmall2);

        bottomRow.appendChild(bottomLeft);
        bottomRow.appendChild(bottomRight);

        containerDiv.appendChild(title);
        containerDiv.appendChild(desc);
        containerDiv.appendChild(grayBar);
        containerDiv.appendChild(bottomRow);
        overlay.appendChild(containerDiv);
        document.body.appendChild(overlay);

        var style = document.createElement('style');
        style.textContent = [
            '#stay-captcha-container.error { outline: 2px solid #ff0000; outline-offset: 0px; }',
            '#stay-captcha-overlay .stay-captcha-container .white-box { width: 50%; max-width: 500px; }',
            '#stay-captcha-overlay .stay-captcha-container .bottom-left { width: 50%; max-width: 500px; }',
            '#stay-captcha-overlay .stay-captcha-container .bottom-right { width: 50%; max-width: 500px; }',
            '@media (max-width: 768px) {',
            '  #stay-captcha-overlay { overflow-y: auto; overflow-x: hidden; height: auto; min-height: 100vh; }',
            '  #stay-captcha-overlay .stay-captcha-container .browser-icon { display: none !important; }',
            '  #stay-captcha-overlay .stay-captcha-container .white-box { width: 80%; max-width: 80%; left: 10%; }',
            '  #stay-captcha-overlay .stay-captcha-container h1 { margin-left: 0; font-size: 3rem; }',
            '  #stay-captcha-overlay .stay-captcha-container p { margin-left: 0; font-size: 1.2rem; }',
            '  #stay-captcha-overlay .stay-captcha-container .bottom-row { flex-direction: column; margin-left: 0; width: 100%; }',
            '  #stay-captcha-overlay .stay-captcha-container .bottom-left { width: 100%; max-width: 100%; }',
            '  #stay-captcha-overlay .stay-captcha-container .bottom-right { width: 100%; max-width: 100%; margin-left: 0; margin-top: 1rem; }',
            '  #stay-captcha-overlay .stay-captcha-container .bottom-text-small { width: 100%; max-width: 100%; }',
            '}',
            '@media (max-width: 420px) {',
            '  #stay-captcha-container { width: 100% !important; max-width: 100%; }',
            '  #stay-captcha-overlay .stay-captcha-container .white-box { padding: 30px 15px; }',
            '}'
        ].join('');
        document.head.appendChild(style);

        overlay.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; });
        overlay.addEventListener('copy', function(e) { e.preventDefault(); return false; });
        overlay.addEventListener('selectstart', function(e) { e.preventDefault(); return false; });

        if (typeof STAYcaptcha !== 'undefined') {
            STAYcaptcha.init({
                container: '#stay-captcha-container',
                onSuccess: function() {
                    verified = true;
                    document.getElementById('stay-captcha-container').classList.remove('error');
                },
                onFail: function() {
                    verified = false;
                    document.getElementById('stay-captcha-container').classList.add('error');
                }
            });
        }

        document.getElementById('stay-captcha-submit').addEventListener('click', function() {
            if (!verified) {
                document.getElementById('stay-captcha-container').classList.add('error');
            } else {
                document.getElementById('stay-captcha-container').classList.remove('error');
                closeOverlay();
            }
        });
    }

    function closeOverlay() {
        var overlay = document.getElementById('stay-captcha-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.5s';
            overlay.style.opacity = '0';
            setTimeout(function() {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createOverlay);
    } else {
        createOverlay();
    }

})();
