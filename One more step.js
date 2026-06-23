// stay-captcha-page.js
(function() {
    // 注入样式
    var style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
        }
        html, body {
            width: 100%;
            height: 100%;
            background-color: #ffffff;
        }
        body {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 1.25rem;
            overflow: hidden;
        }
        .sc-container {
            width: 100%;
            max-width: 1000px;
            padding: 0 20px 40px 20px;
            position: relative;
        }
        .sc-title {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 4.5rem;
            color: #1a1a1a;
            margin: 0;
            text-align: left;
            margin-left: -60px;
        }
        .sc-subtitle {
            font-weight: 300;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1.6rem;
            color: #888888;
            margin: 1rem 0 0 0;
            text-align: left;
            margin-left: -60px;
        }
        .sc-gray-bar {
            width: 100vw;
            height: 500px;
            background-color: #e0e0e0;
            margin-top: 2rem;
            margin-left: calc(-50vw + 50%);
            border-radius: 0;
            position: relative;
        }
        .sc-white-box {
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
        .sc-captcha-container {
            width: 100%;
            margin-left: -30px;
        }
        .sc-captcha-container.error {
            outline: 2px solid #ff0000;
            outline-offset: 4px;
        }
        .sc-submit-btn {
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
        .sc-submit-btn:hover {
            opacity: 0.8;
        }
        .sc-browser-icon {
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
        .sc-browser-bar {
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
        .sc-browser-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #e0e0e0;
        }
        .sc-browser-dot:nth-child(1) {
            background-color: #ff5f57;
        }
        .sc-browser-dot:nth-child(2) {
            background-color: #ffbd2e;
        }
        .sc-browser-dot:nth-child(3) {
            background-color: #28c840;
        }
        .sc-browser-body {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #ffffff;
            font-size: 160px;
            margin-left: -160px;
        }
        .sc-bottom-row {
            display: flex;
            align-items: flex-start;
            margin-top: 1rem;
            margin-left: -60px;
            width: calc(100% + 120px);
        }
        .sc-bottom-left {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 2rem;
            color: #000000;
            text-align: left;
            width: 50%;
            max-width: 500px;
        }
        .sc-bottom-right {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 2rem;
            color: #000000;
            text-align: left;
            width: 50%;
            max-width: 500px;
            margin-left: auto;
        }
        .sc-bottom-text-small {
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 1rem;
            color: #000000;
            text-align: left;
            margin-top: 0.5rem;
            width: 100%;
        }
        @media (max-width: 768px) {
            html, body {
                height: auto;
                min-height: 100vh;
            }
            body {
                overflow-y: auto;
                overflow-x: hidden;
            }
            .sc-browser-icon {
                display: none !important;
            }
            .sc-white-box {
                width: 80%;
                max-width: 80%;
                left: 10%;
            }
            .sc-title {
                margin-left: 0;
                font-size: 3rem;
            }
            .sc-subtitle {
                margin-left: 0;
                font-size: 1.2rem;
            }
            .sc-bottom-row {
                flex-direction: column;
                margin-left: 0;
                width: 100%;
            }
            .sc-bottom-left {
                width: 100%;
                max-width: 100%;
            }
            .sc-bottom-right {
                width: 100%;
                max-width: 100%;
                margin-left: 0;
                margin-top: 1rem;
            }
            .sc-bottom-text-small {
                width: 100%;
                max-width: 100%;
            }
        }
    `;
    document.head.appendChild(style);

    // 创建 HTML 结构
    var container = document.createElement('div');
    container.className = 'sc-container';
    container.innerHTML = `
        <h1 class="sc-title">One more step</h1>
        <p class="sc-subtitle">Please complete the security check to access staycaptcha.github.io</p>
        <div class="sc-gray-bar">
            <div class="sc-white-box">
                <div id="sc-captcha-container" class="sc-captcha-container"></div>
                <button class="sc-submit-btn" id="sc-submit-btn">Submit</button>
            </div>
            <div class="sc-browser-icon">
                <div class="sc-browser-bar">
                    <div class="sc-browser-dot"></div>
                    <div class="sc-browser-dot"></div>
                    <div class="sc-browser-dot"></div>
                </div>
                <div class="sc-browser-body">⚠️</div>
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
    `;

    // 清空 body 并插入
    document.body.innerHTML = '';
    document.body.appendChild(container);

    // 禁止右键、复制、选中
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; });
    document.addEventListener('copy', function(e) { e.preventDefault(); return false; });
    document.addEventListener('selectstart', function(e) { e.preventDefault(); return false; });

    // 加载验证码 SDK
    var script = document.createElement('script');
    script.src = 'https://staycaptcha.github.io/Captcha/stay-captcha.js';
    script.onload = function() {
        var verified = false;
        STAYcaptcha.init({
            container: '#sc-captcha-container',
            onSuccess: function() {
                verified = true;
                document.getElementById('sc-captcha-container').classList.remove('error');
            },
            onFail: function() {
                verified = false;
            }
        });

        document.getElementById('sc-submit-btn').addEventListener('click', function() {
            if (!verified) {
                document.getElementById('sc-captcha-container').classList.add('error');
            } else {
                document.getElementById('sc-captcha-container').classList.remove('error');
            }
        });
    };
    document.head.appendChild(script);
})();