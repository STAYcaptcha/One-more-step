(function() {
    'use strict';

    var verified = false;
    var containerId = 'staycaptcha-overlay';
    var currentHost = window.location.hostname || '';

    var style = document.createElement('style');
    style.id = 'staycaptcha-style';
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
        }
        #staycaptcha-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            z-index: 999999;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 1.25rem;
            overflow: hidden;
        }
        #staycaptcha-overlay .sc-container {
            width: 100%;
            max-width: 1000px;
            padding: 0 20px 40px 20px;
            position: relative;
        }
        #staycaptcha-overlay .sc-title {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 4.5rem;
            color: #1a1a1a;
            margin: 0;
            text-align: left;
            margin-left: -60px;
        }
        #staycaptcha-overlay .sc-subtitle {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1.6rem;
            color: #888888;
            margin: 1rem 0 0 0;
            text-align: left;
            margin-left: -60px;
        }
        #staycaptcha-overlay .sc-gray-bar {
            width: 100vw;
            height: 500px;
            background-color: #e0e0e0;
            margin-top: 2rem;
            margin-left: calc(-50vw + 50%);
            border-radius: 0;
            position: relative;
        }
        #staycaptcha-overlay .sc-white-box {
            background-color: #ffffff;
            border-radius: 0;
            padding: 50px 30px;
            width: 50%;
            max-width: 500px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            position: absolute;
            top: 60px;
            left: calc(20px + (100vw - 1000px) / 2 - 60px);
        }
        #staycaptcha-overlay .sc-captcha-container {
            display: inline-block;
            width: 420px;
            margin-left: 0;
        }
        #staycaptcha-overlay .sc-captcha-container.error {
            outline: 2px solid #ff0000;
            outline-offset: 0px;
        }
        #staycaptcha-overlay .sc-submit-btn {
            background-color: #e0e0e0;
            color: #000000;
            border: 1px solid #000000;
            border-radius: 0;
            padding: 4px 14px;
            font-size: 0.75rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            cursor: pointer;
            margin-top: 20px;
            align-self: flex-start;
        }
        #staycaptcha-overlay .sc-submit-btn:hover {
            opacity: 0.8;
        }
        #staycaptcha-overlay .sc-browser-icon {
            position: absolute;
            top: 60px;
            right: -40px;
            width: 50%;
            height: calc(100% - 60px);
            background-color: #ffffff;
            border-radius: 12px 0 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        #staycaptcha-overlay .sc-browser-bar {
            width: 100%;
            height: 40px;
            background-color: #f0f0f0;
            border-radius: 0;
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 10px;
            flex-shrink: 0;
        }
        #staycaptcha-overlay .sc-browser-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #e0e0e0;
        }
        #staycaptcha-overlay .sc-browser-dot:nth-child(1) {
            background-color: #ff5f57;
        }
        #staycaptcha-overlay .sc-browser-dot:nth-child(2) {
            background-color: #ffbd2e;
        }
        #staycaptcha-overlay .sc-browser-dot:nth-child(3) {
            background-color: #28c840;
        }
        #staycaptcha-overlay .sc-browser-body {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #ffffff;
            font-size: 160px;
            margin-left: -160px;
        }
        #staycaptcha-overlay .sc-bottom-row {
            display: flex;
            align-items: flex-start;
            margin-top: 1rem;
            margin-left: -60px;
            width: calc(100% + 120px);
        }
        #staycaptcha-overlay .sc-bottom-left {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 2rem;
            color: #000000;
            text-align: left;
            width: 50%;
            max-width: 500px;
        }
        #staycaptcha-overlay .sc-bottom-right {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 2rem;
            color: #000000;
            text-align: left;
            width: 50%;
            max-width: 500px;
            margin-left: auto;
        }
        #staycaptcha-overlay .sc-bottom-text-small {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1rem;
            color: #000000;
            text-align: left;
            margin-top: 0.5rem;
            width: 100%;
        }
        #staycaptcha-overlay .sc-hostname {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1.6rem;
            color: #888888;
            margin: 1rem 0 0 0;
            text-align: left;
            margin-left: -60px;
        }

        @media (max-width: 768px) {
            #staycaptcha-overlay {
                overflow-y: auto;
                overflow-x: hidden;
            }
            #staycaptcha-overlay .sc-browser-icon {
                display: none !important;
            }
            #staycaptcha-overlay .sc-white-box {
                width: 80%;
                max-width: 80%;
                left: 10%;
            }
            #staycaptcha-overlay .sc-title {
                margin-left: 0;
                font-size: 3rem;
            }
            #staycaptcha-overlay .sc-subtitle {
                margin-left: 0;
                font-size: 1.2rem;
            }
            #staycaptcha-overlay .sc-hostname {
                margin-left: 0;
                font-size: 1.2rem;
            }
            #staycaptcha-overlay .sc-bottom-row {
                flex-direction: column;
                margin-left: 0;
                width: 100%;
            }
            #staycaptcha-overlay .sc-bottom-left {
                width: 100%;
                max-width: 100%;
            }
            #staycaptcha-overlay .sc-bottom-right {
                width: 100%;
                max-width: 100%;
                margin-left: 0;
                margin-top: 1rem;
            }
            #staycaptcha-overlay .sc-bottom-text-small {
                width: 100%;
                max-width: 100%;
            }
        }
    `;

    function createOverlay() {
        var existing = document.getElementById(containerId);
        if (existing) {
            existing.style.display = 'flex';
            return;
        }

        var overlay = document.createElement('div');
        overlay.id = containerId;

        var hostDisplay = currentHost || '';

        overlay.innerHTML = `
            <div class="sc-container">
                <h1 class="sc-title">One more step</h1>
                <p class="sc-subtitle">Please complete the security check to access</p>
                <p class="sc-hostname">${hostDisplay}</p>
                <div class="sc-gray-bar">
                    <div class="sc-white-box">
                        <div class="sc-captcha-container" id="sc-captcha-container"></div>
                        <button class="sc-submit-btn" id="sc-submit-btn">Submit</button>
                    </div>
                    <div class="sc-browser-icon">
                        <div class="sc-browser-bar">
                            <div class="sc-browser-dot"></div>
                            <div class="sc-browser-dot"></div>
                            <div class="sc-browser-dot"></div>
                        </div>
                        <div class="sc-browser-body">
                            ⚠️
                        </div>
                    </div>
                </div>
                <div class="sc-bottom-row">
                    <div class="sc-bottom-left">
                        Why do I have to complete a CAPTCHA?
                        <div class="sc-bottom-text-small">Completing the CAPTCHA proves you are a human and gives you temporary access to the web property.</div>
                    </div>
                    <div class="sc-bottom-right">
                        What can I do to prevent this in the future?
                        <div class="sc-bottom-text-small">If you are on a personal connection, like at home, you can run an anti-virus scan on your device to make sure it is not infected with malware.</div>
                        <div class="sc-bottom-text-small">If you are at an office or shared network, you can ask the network administrator to run a scan across the network looking for</div>
                    </div>
                </div>
            </div>
        `;

        document.head.appendChild(style);
        document.body.appendChild(overlay);

        var script = document.createElement('script');
        script.src = 'https://staycaptcha.github.io/Captcha/stay-captcha.js';
        script.onload = function() {
            STAYcaptcha.init({
                container: '#sc-captcha-container',
                onSuccess: function() {
                    verified = true;
                    document.getElementById('sc-captcha-container').classList.remove('error');
                },
                onFail: function() {
                    verified = false;
                    document.getElementById('sc-captcha-container').classList.add('error');
                }
            });
        };
        document.head.appendChild(script);

        document.getElementById('sc-submit-btn').addEventListener('click', function() {
            if (!verified) {
                document.getElementById('sc-captcha-container').classList.add('error');
            } else {
                document.getElementById('sc-captcha-container').classList.remove('error');
                closeOverlay();
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
    }

    function closeOverlay() {
        var overlay = document.getElementById(containerId);
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createOverlay);
    } else {
        createOverlay();
    }

})();
