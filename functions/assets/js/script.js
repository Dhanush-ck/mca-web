const $ = id => document.getElementById(id);
const T = value => ["text", value];
const N = value => ["number", value];

const strings = [
    ["Length", {text: T("Hello JavaScript")}, v => v.text.length],
    ["First Occurrence", {text: T("Hello JavaScript"), word: T("JavaScript")}, v => v.text.indexOf(v.word)],
    ["Last Occurrence", {text: T("Hello JavaScript Hello"), word: T("Hello")}, v => v.text.lastIndexOf(v.word)],
    ["Search", {text: T("Learn JavaScript"), word: T("JavaScript")}, v => v.text.search(v.word)],
    ["Slice", {text: T("JavaScript"), start: N(0), end: N(4)}, v => v.text.slice(v.start, v.end)],
    ["Substring", {text: T("JavaScript"), start: N(4), end: N(10)}, v => v.text.substring(v.start, v.end)],
    ["Substr", {text: T("JavaScript"), start: N(4), length: N(6)}, v => v.text.substr(v.start, v.length)],
    ["Replace", {text: T("Hello World"), old: T("World"), new: T("JavaScript")}, v => v.text.replace(v.old, v.new)],
    ["Uppercase", {text: T("Hello JavaScript")}, v => v.text.toUpperCase()],
    ["Lowercase", {text: T("HELLO JAVASCRIPT")}, v => v.text.toLowerCase()]
];

const maths = [
    ["Power", {base: N(2), exponent: N(3)}, v => Math.pow(v.base, v.exponent)],
    ["Square Root", {number: N(25)}, v => Math.sqrt(v.number)],
    ["Round", {number: N(4.6)}, v => Math.round(v.number)],
    ["Ceiling", {number: N(4.2)}, v => Math.ceil(v.number)],
    ["Floor", {number: N(4.8)}, v => Math.floor(v.number)],
    ["Absolute Value", {number: N(-25.5)}, v => Math.abs(v.number)],
    ["Sine", {angle: N(30)}, v => Math.sin(v.angle * Math.PI / 180)],
    ["Cosine", {angle: N(60)}, v => Math.cos(v.angle * Math.PI / 180)],
    ["Minimum", {numbers: T("10, 25, -5, 4.5")}, v => Math.min(...parseNumbers(v.numbers))],
    ["Maximum", {numbers: T("10, 25, -5, 4.5")}, v => Math.max(...parseNumbers(v.numbers))],
    ["Random Number", {min: N(1), max: N(100)}, v => {
        if (!Number.isInteger(v.min) || !Number.isInteger(v.max) || v.max < v.min)
            throw Error("Enter valid whole-number limits.");
        return Math.floor(Math.random() * (v.max - v.min + 1)) + v.min;
    }]
];

let mode = strings, selected = strings[0], result = "";

function parseNumbers(text) {
    const values = text.split(",").map(x => x.trim());

    if (values.some(x => x === "" || !Number.isFinite(Number(x))))
        throw Error("Enter valid comma-separated numbers.");

    return values.map(Number);
}

function showMenu() {
    $("navTitle").textContent = mode === strings ? "STRING FUNCTIONS" : "MATH FUNCTIONS";
    $("heading").textContent = mode === strings ? "Explore String Functions" : "Explore Math Functions";

    $("navList").innerHTML = mode.map((op, i) =>
        `<li><button class="nav-item ${op === selected ? "active" : ""}" data-id="${i}">${op[0]}</button></li>`
    ).join("");

    $("navList").querySelectorAll("button").forEach(btn => {
        btn.onclick = () => {
            selected = mode[btn.dataset.id];
            showMenu();
            showFields();
        };
    });
}

function showFields() {
    $("opTitle").textContent = selected[0];
    $("opDesc").textContent = "Enter the values and run the operation.";
    $("example").textContent = selected[2].toString();
    $("info").textContent = "JavaScript function: " + selected[0];

    $("fields").innerHTML = Object.entries(selected[1]).map(([key, data]) => `
        <div class="field">
            <label for="${key}">${key}</label>
            <input id="${key}" type="${data[0]}" step="any"
                value="${data[1]}" placeholder="Enter ${key}">
        </div>
    `).join("");

    $("result").textContent = "Your result will appear here.";
    $("status").textContent = "YOUR RESULT";
    $("message").textContent = "Enter values and run the operation.";
    result = "";
}

$("form").onsubmit = e => {
    e.preventDefault();

    try {
        const values = {};

        Object.entries(selected[1]).forEach(([key, data]) => {
            const input = $(key);

            if (input.value.trim() === "")
                throw Error("Please fill in all fields.");

            values[key] = data[0] === "number"
                ? Number(input.value)
                : input.value;

            if (data[0] === "number" && !Number.isFinite(values[key]))
                throw Error("Enter valid numeric values.");
        });

        const output = selected[2](values);

        if (typeof output === "number" && !Number.isFinite(output))
            throw Error("Result is undefined for these values.");

        result = String(output);
        $("result").textContent = result;
        $("status").textContent = "SUCCESS";
        $("message").textContent = "Operation completed successfully.";
    } catch (error) {
        result = "";
        $("result").textContent = error.message;
        $("status").textContent = "INPUT ERROR";
        $("message").textContent = "Check your input and try again.";
    }
};

$("mode").onclick = () => {
    mode = mode === strings ? maths : strings;
    selected = mode[0];

    document.body.classList.toggle("math", mode === maths);
    $("mode").textContent = mode === strings ? "Math Mode" : "String Mode";

    showMenu();
    showFields();
};

$("copy").onclick = async () => {
    if (!result) {
        $("message").textContent = "Run an operation first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(result);
        $("message").textContent = "Result copied successfully.";
    } catch {
        $("message").textContent = "Clipboard unavailable. Copy the result manually.";
    }
};

$("reset").onclick = showFields;

showMenu();
showFields();