(function() {
    var currentUrl = window.location.href;

    var style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
        }
        #captcha-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #ffffff;
            z-index: 999999;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 1.25rem;
            overflow: hidden;
        }
        #captcha-overlay .container {
            width: 100%;
            max-width: 1000px;
            padding: 0 20px 40px 20px;
            position: relative;
        }
        #captcha-overlay h1 {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 4.5rem;
            color: #1a1a1a;
            margin: 0;
            text-align: left;
            margin-left: -60px;
        }
        #captcha-overlay .sub-title {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1.6rem;
            color: #888888;
            margin: 1rem 0 0 0;
            text-align: left;
            margin-left: -60px;
        }
        #captcha-overlay .gray-bar {
            width: 100vw;
            height: 500px;
            background-color: #e0e0e0;
            margin-top: 2rem;
            margin-left: calc(-50vw + 50%);
            border-radius: 0;
            position: relative;
        }
        #captcha-overlay .white-box {
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
        #captcha-overlay #captcha-container {
            display: inline-block;
            width: 420px;
            margin-left: 0;
        }
        #captcha-overlay #captcha-container.error {
            outline: 2px solid #ff0000;
            outline-offset: 0px;
        }
        #captcha-overlay .submit-btn {
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
        #captcha-overlay .submit-btn:hover {
            opacity: 0.8;
        }
        #captcha-overlay .browser-icon {
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
        #captcha-overlay .browser-bar {
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
        #captcha-overlay .browser-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #e0e0e0;
        }
        #captcha-overlay .browser-dot:nth-child(1) {
            background-color: #ff5f57;
        }
        #captcha-overlay .browser-dot:nth-child(2) {
            background-color: #ffbd2e;
        }
        #captcha-overlay .browser-dot:nth-child(3) {
            background-color: #28c840;
        }
        #captcha-overlay .browser-body {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #ffffff;
            font-size: 160px;
            margin-left: -160px;
        }
        #captcha-overlay .bottom-row {
            display: flex;
            align-items: flex-start;
            margin-top: 1rem;
            margin-left: -60px;
            width: calc(100% + 120px);
        }
        #captcha-overlay .bottom-left {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 2rem;
            color: #000000;
            text-align: left;
            width: 50%;
            max-width: 500px;
        }
        #captcha-overlay .bottom-right {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 2rem;
            color: #000000;
            text-align: left;
            width: 50%;
            max-width: 500px;
            margin-left: auto;
        }
        #captcha-overlay .bottom-text-small {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1rem;
            color: #000000;
            text-align: left;
            margin-top: 0.5rem;
            width: 100%;
        }

        @media (max-width: 768px) {
            #captcha-overlay {
                padding-top: 0.5rem;
                overflow-y: auto;
                overflow-x: hidden;
                align-items: flex-start;
                padding-top: 0;
            }
            #captcha-overlay .browser-icon {
                display: none !important;
            }
            #captcha-overlay .white-box {
                width: 80%;
                max-width: 80%;
                left: 10%;
                position: relative;
                top: 0;
                margin-top: 20px;
            }
            #captcha-overlay h1 {
                margin-left: 0;
                font-size: 3rem;
                padding: 0 20px;
            }
            #captcha-overlay .sub-title {
                margin-left: 0;
                font-size: 1.2rem;
                padding: 0 20px;
            }
            #captcha-overlay .gray-bar {
                height: auto;
                min-height: 400px;
                margin-left: 0;
                width: 100%;
                padding: 20px;
                display: flex;
                justify-content: center;
            }
            #captcha-overlay .bottom-row {
                flex-direction: column;
                margin-left: 0;
                width: 100%;
                padding: 0 20px;
            }
            #captcha-overlay .bottom-left {
                width: 100%;
                max-width: 100%;
            }
            #captcha-overlay .bottom-right {
                width: 100%;
                max-width: 100%;
                margin-left: 0;
                margin-top: 1rem;
            }
            #captcha-overlay .bottom-text-small {
                width: 100%;
                max-width: 100%;
            }
            #captcha-overlay #captcha-container {
                width: 100%;
                max-width: 420px;
            }
            #captcha-overlay .white-box {
                padding: 30px 20px;
                width: 90%;
                max-width: 90%;
                left: 5%;
            }
            #captcha-overlay .container {
                padding: 0 10px;
            }
        }
    `;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'captcha-overlay';
    overlay.innerHTML = `
        <div class="container">
            <h1>One more step</h1>
            <p class="sub-title">Please complete the security check to access ${currentUrl ? currentUrl : ''}</p>
            <div class="gray-bar">
                <div class="white-box">
                    <div id="captcha-container"></div>
                    <button class="submit-btn" id="submitBtn">Submit</button>
                </div>
                <div class="browser-icon">
                    <div class="browser-bar">
                        <div class="browser-dot"></div>
                        <div class="browser-dot"></div>
                        <div class="browser-dot"></div>
                    </div>
                    <div class="browser-body">
                        ⚠️
                    </div>
                </div>
            </div>
            <div class="bottom-row">
                <div class="bottom-left">
                    Why do I have to complete a CAPTCHA?
                    <div class="bottom-text-small">Completing the CAPTCHA proves you are a human and gives you temporary access to the web property.</div>
                </div>
                <div class="bottom-right">
                    What can I do to prevent this in the future?
                    <div class="bottom-text-small">If you are on a personal connection, like at home, you can run an anti-virus scan on your device to make sure it is not infected with malware.</div>
                    <div class="bottom-text-small">If you are at an office or shared network, you can ask the network administrator to run a scan across the network looking for</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    var script = document.createElement('script');
    script.src = 'https://staycaptcha.github.io/Captcha/stay-captcha.js';
    script.onload = function() {
        var verified = false;

        STAYcaptcha.init({
            container: '#captcha-container',
            onSuccess: function() {
                verified = true;
                document.getElementById('captcha-container').classList.remove('error');
            },
            onFail: function() {
                verified = false;
                document.getElementById('captcha-container').classList.add('error');
            }
        });

        document.getElementById('submitBtn').addEventListener('click', function() {
            if (!verified) {
                document.getElementById('captcha-container').classList.add('error');
            } else {
                document.getElementById('captcha-overlay').style.display = 'none';
            }
        });
    };
    document.head.appendChild(script);

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
})();
