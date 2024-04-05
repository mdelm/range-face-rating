window.addEventListener("DOMContentLoaded", () => {
    const fr = new FaceRating("#face-rating");
});

class FaceRating {
    constructor(qs) {
        this.input = document.querySelector(qs);
        if (this.input) {
            this.input.addEventListener("input", this.update.bind(this));
            this.face = this.input.previousElementSibling;
            this.update();
        }
    }

    update(e) {
        let value = this.input.value; // Use .value instead of .defaultValue

        if (e) value = e.target.value; // Simplify the condition

        const min = parseFloat(this.input.min) || 0; // Convert min and max to numbers
        const max = parseFloat(this.input.max) || 100;
        const percentRaw = (value - min) / (max - min) * 100;
        const percent = +percentRaw.toFixed(2);

        this.input.style.setProperty("--percent", `${percent}%`);

        const maxHue = 120;
        const hueExtend = 30;
        const hue = Math.round(maxHue * percent / 100);

        let hue2 = hue - hueExtend;
        if (hue2 < 0) hue2 += 360;

        const hues = [hue, hue2];
        hues.forEach((h, i) => {
            this.face.style.setProperty(`--face-hue${i + 1}`, h);
        });

        this.input.style.setProperty("--input-hue", hue);

        const duration = 1;
        const delay = -(duration * 0.99) * percent / 100;
        const parts = ["right", "left", "mouth-lower", "mouth-upper"];

        parts.forEach(p => {
            const el = this.face.querySelector(`[data-${p}]`);
            el && el.style.setProperty(`--delay-${p}`, `${delay}s`); // Use optional chaining and nullish coalescing
        });

        const faces = [
            "Sad face",
            "Slightly sad face",
            "Straight face",
            "Slightly happy face",
            "Happy face"
        ];
        let faceIndex = Math.floor(faces.length * percent / 100);
        if (faceIndex === faces.length) faceIndex--; // Simplify the condition

        this.face.setAttribute("aria-label", faces[faceIndex]);
    }
}
