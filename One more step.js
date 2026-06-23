(function() {
    'use strict';

    if (document.getElementById('captcha-overlay')) {
        return;
    }

    var CONFIG = {
        targetUrl: window.location.hostname || ''
    };

    var overlay = document.createElement('div');
    overlay.id = 'captcha-overlay';
    overlay.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'width: 100vw',
        'height: 100vh',
        'background: #ffffff',
        'z-index: 99999',
        'display: flex',
        'align-items: flex-start',
        'justify-content: center',
        'padding-top: 1.25rem',
        'overflow: hidden',
        'user-select: none',
        '-webkit-user-select: none'
    ].join(';');

    var container = document.createElement('div');
    container.style.cssText = [
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

    var subtitle = document.createElement('p');
    var urlDisplay = CONFIG.targetUrl || '';
    subtitle.textContent = 'Please complete the security check to access ' + urlDisplay;
    subtitle.style.cssText = [
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
    whiteBox.style.cssText = [
        'background-color: #ffffff',
        'border-radius: 0',
        'padding: 50px 30px',
        'width: 50%',
        'max-width: 500px',
        'box-shadow: 0 2px 10px rgba(0,0,0,0.06)',
        'display: flex',
        'flex-direction: column',
        'align-items: flex-start',
        'justify-content: center',
        'position: absolute',
        'top: 60px',
        'left: calc(20px + (100vw - 1000px) / 2 - 60px)'
    ].join(';');

    var captchaWrapper = document.createElement('div');
    captchaWrapper.style.cssText = [
        'position: relative',
        'width: 100%'
    ].join(';');

    var captchaContainer = document.createElement('div');
    captchaContainer.id = 'captcha-container';
    captchaContainer.style.cssText = [
        'width: 100%',
        'margin-left: -30px',
        'min-height: 80px'
    ].join(';');

    var errorBorder = document.createElement('div');
    errorBorder.id = 'captcha-error-border';
    errorBorder.style.cssText = [
        'position: absolute',
        'top: -6px',
        'left: -36px',
        'width: calc(100% + 12px)',
        'height: calc(100% + 12px)',
        'border: 2px solid #ff0000',
        'border-radius: 4px',
        'pointer-events: none',
        'display: none',
        'z-index: 10'
    ].join(';');

    captchaWrapper.appendChild(captchaContainer);
    captchaWrapper.appendChild(errorBorder);

    var submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'captcha-submit-btn';
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

    var browserIcon = document.createElement('div');
    browserIcon.className = 'captcha-browser-icon';
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
    browserBody.textContent = '⚠️';

    browserIcon.appendChild(browserBar);
    browserIcon.appendChild(browserBody);

    var bottomRow = document.createElement('div');
    bottomRow.style.cssText = [
        'display: flex',
        'align-items: flex-start',
        'margin-top: 1rem',
        'margin-left: -60px',
        'width: calc(100% + 120px)'
    ].join(';');

    var bottomLeft = document.createElement('div');
    bottomLeft.style.cssText = [
        'font-weight: 400',
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        'font-size: 2rem',
        'color: #000000',
        'text-align: left',
        'width: 50%',
        'max-width: 500px'
    ].join(';');
    bottomLeft.innerHTML = 'Why do I have to complete a CAPTCHA?<div style="font-weight:400;font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif;font-size:1rem;color:#000000;text-align:left;margin-top:0.5rem;width:100%;">Completing the CAPTCHA proves you are a human and gives you temporary access to the web property.</div>';

    var bottomRight = document.createElement('div');
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
    bottomRight.innerHTML = 'What can I do to prevent this in the future?<div style="font-weight:400;font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif;font-size:1rem;color:#000000;text-align:left;margin-top:0.5rem;width:100%;">If you are on a personal connection, like at home, you can run an anti-virus scan on your device to make sure it is not infected with malware.</div><div style="font-weight:400;font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif;font-size:1rem;color:#000000;text-align:left;margin-top:0.3rem;width:100%;">If you are at an office or shared network, you can ask the network administrator to run a scan across the network looking for</div>';

    bottomRow.appendChild(bottomLeft);
    bottomRow.appendChild(bottomRight);

    whiteBox.appendChild(captchaWrapper);
    whiteBox.appendChild(submitBtn);

    grayBar.appendChild(whiteBox);
    grayBar.appendChild(browserIcon);

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(grayBar);
    container.appendChild(bottomRow);

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // 添加自适应样式
    var styleEl = document.createElement('style');
    styleEl.textContent = [
        '@media (max-width: 768px) {',
        '  .captcha-browser-icon { display: none !important; }',
        '  .captcha-white-box {',
        '    width: 80% !important;',
        '    max-width: 400px !important;',
        '    left: 10% !important;',
        '  }',
        '  .captcha-h1, .captcha-subtitle, .captcha-bottom-row, .captcha-bottom-text-small { margin-left: 0 !important; }',
        '  .captcha-bottom-row {',
        '    width: 100% !important;',
        '    margin-left: 0 !important;',
        '    flex-direction: column !important;',
        '    gap: 20px !important;',
        '  }',
        '  .captcha-bottom-left, .captcha-bottom-right {',
        '    width: 100% !important;',
        '    max-width: 100% !important;',
        '    margin-left: 0 !important;',
        '  }',
        '  .captcha-gray-bar { height: 400px !important; }',
        '  #captcha-container { margin-left: 0 !important; }',
        '  #captcha-error-border {',
        '    left: -6px !important;',
        '    width: calc(100% + 12px) !important;',
        '  }',
        '}',
        '@media (max-width: 480px) {',
        '  .captcha-h1 { font-size: 2.8rem !important; }',
        '  .captcha-subtitle { font-size: 1.2rem !important; }',
        '  .captcha-bottom-left, .captcha-bottom-right { font-size: 1.4rem !important; }',
        '  .captcha-gray-bar { height: 350px !important; }',
        '  .captcha-white-box {',
        '    padding: 30px 16px !important;',
        '    width: 90% !important;',
        '    left: 5% !important;',
        '  }',
        '  .captcha-browser-body {',
        '    font-size: 100px !important;',
        '    margin-left: -80px !important;',
        '  }',
        '}'
    ].join('\n');
    document.head.appendChild(styleEl);

    // 添加 class 以便样式控制
    title.className = 'captcha-h1';
    subtitle.className = 'captcha-subtitle';
    grayBar.className = 'captcha-gray-bar';
    whiteBox.className = 'captcha-white-box';
    bottomRow.className = 'captcha-bottom-row';
    bottomLeft.className = 'captcha-bottom-left';
    bottomRight.className = 'captcha-bottom-right';
    browserBody.className = 'captcha-browser-body';

    var captchaVerified = false;

    function showError() {
        var border = document.getElementById('captcha-error-border');
        if (border) {
            border.style.display = 'block';
            setTimeout(function() {
                border.style.display = 'none';
            }, 2000);
        }
    }

    submitBtn.addEventListener('click', function() {
        if (captchaVerified) {
            var overlayEl = document.getElementById('captcha-overlay');
            if (overlayEl && overlayEl.parentNode) {
                overlayEl.parentNode.removeChild(overlayEl);
            }
        } else {
            showError();
        }
    });

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadScript('https://staycaptcha.github.io/Captcha/stay-captcha.js', function() {
        if (typeof STAYcaptcha !== 'undefined') {
            STAYcaptcha.init({
                container: '#captcha-container',
                onSuccess: function() {
                    captchaVerified = true;
                },
                onFail: function() {
                    captchaVerified = false;
                }
            });
        }
    });

})();