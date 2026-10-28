const fs = require('fs');
const path = require('path');

// Read the script file
const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');

describe('Video Autoplay Fallback', () => {
    let container;
    let video;

    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = `
            <div class="video-background">
                <video></video>
            </div>
        `;
        container = document.querySelector('.video-background');
        video = document.querySelector('video');

        // Mock requestAnimationFrame for the particle canvas
        window.requestAnimationFrame = jest.fn();

        // Clear any previous event listeners added to window/document
        jest.restoreAllMocks();
    });

    test('creates play button when autoplay is prevented', async () => {
        // Mock play method to return a rejected promise
        // Catch the rejection in our test so it doesn't leak unhandled promise rejections
        let rejectionPromise;
        video.play = jest.fn().mockImplementation(() => {
            rejectionPromise = Promise.reject(new Error('Autoplay prevented'));
            // prevent UnhandledPromiseRejectionWarning from node
            rejectionPromise.catch(() => {});
            return rejectionPromise;
        });

        // Execute the script
        eval(scriptContent);

        // Trigger DOMContentLoaded
        document.dispatchEvent(new Event('DOMContentLoaded'));

        // Wait for the rejection to propagate through the catch block in script.js
        if (rejectionPromise) {
            try { await rejectionPromise; } catch(e) {}
            // Allow event loop to process the microtask queue
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        // Assertions
        expect(video.play).toHaveBeenCalled();

        const playButton = container.querySelector('.video-play-button');
        expect(playButton).not.toBeNull();
        expect(playButton.innerHTML).toBe('<span>▶</span>');

        // Reset the mock for the second call
        video.play.mockClear();
        video.play.mockReturnValue(Promise.resolve());

        // Test button click
        playButton.click();
        expect(video.play).toHaveBeenCalledTimes(1);
        expect(playButton.style.display).toBe('none');
    });
});
