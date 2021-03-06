"use strict";

let items = {
    upgrades: [
        "missile_launcher",
        "dark_beam",
        "light_beam",
        "annihilator_beam",
        "dark_suit",
        "morph_ball_bomb",
        "violet_translator",
        "super_missile",
        "darkburst",
        "sunburst",
        "sonic_boom",
        "light_suit",
        "power_bomb",
        "amber_translator",
        "seeker_launcher",
        "dark_visor",
        "echo_visor",
        "boost_ball",
        "emerald_translator",
        "energy_transfer_module",
        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",
        "spider_ball",
        "cobalt_translator",
    ],

    expansions: [
        "energy_tank",
        "missile_expansion",
        "power_bomb_expansion",
        "beam_ammo_expansion",
        "dark_ammo_expansion",
        "light_ammo_expansion",
    ],

    keys: {
        dark_agon_key: 3,
        dark_torvus_key: 3,
        ing_hive_key: 3,
        sky_temple_key: 9,
    },
};

let upgrade_grid_layouts = {
    "3×9": [
        "missile_launcher",
        "dark_beam",
        "light_beam",
        "annihilator_beam",
        "dark_suit",
        "violet_translator",
        "amber_translator",
        "emerald_translator",
        "cobalt_translator",

        "super_missile",
        "darkburst",
        "sunburst",
        "sonic_boom",
        "light_suit",
        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",

        "seeker_launcher",
        "dark_visor",
        "echo_visor",
        "energy_transfer_module",
        "",
        "morph_ball_bomb",
        "power_bomb",
        "boost_ball",
        "spider_ball",
    ],
    "4×5": [
        "dark_beam",
        "light_beam",
        "annihilator_beam",
        "morph_ball_bomb",
        "violet_translator",

        "super_missile",
        "dark_visor",
        "dark_suit",
        "boost_ball",
        "amber_translator",

        "seeker_launcher",
        "echo_visor",
        "light_suit",
        "spider_ball",
        "emerald_translator",

        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",
        "cobalt_translator",
    ],

    "4×7": [
        "missile_launcher",
        "dark_beam",
        "light_beam",
        "annihilator_beam",
        "dark_suit",
        "morph_ball_bomb",
        "violet_translator",

        "super_missile",
        "darkburst",
        "sunburst",
        "sonic_boom",
        "light_suit",
        "power_bomb",
        "amber_translator",

        "seeker_launcher",
        "",
        "dark_visor",
        "echo_visor",
        "",
        "boost_ball",
        "emerald_translator",

        "energy_transfer_module",
        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",
        "spider_ball",
        "cobalt_translator",
    ],

    "5×4": [
        "dark_beam",
        "light_beam",
        "annihilator_beam",
        "morph_ball_bomb",

        "super_missile",
        "dark_visor",
        "dark_suit",
        "boost_ball",

        "seeker_launcher",
        "echo_visor",
        "light_suit",
        "spider_ball",

        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",

        "violet_translator",
        "amber_translator",
        "emerald_translator",
        "cobalt_translator",
    ],

    "5×5": [
        "missile_launcher",
        "dark_beam",
        "light_beam",
        "annihilator_beam",
        "dark_visor",

        "super_missile",
        "darkburst",
        "sunburst",
        "sonic_boom",
        "echo_visor",

        "seeker_launcher",
        "morph_ball_bomb",
        "power_bomb",
        "boost_ball",
        "spider_ball",

        "dark_suit",
        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",

        "light_suit",
        "violet_translator",
        "amber_translator",
        "emerald_translator",
        "cobalt_translator",
    ],

    "7×4": [
        "missile_launcher",
        "dark_beam",
        "light_beam",
        "annihilator_beam",

        "super_missile",
        "darkburst",
        "sunburst",
        "sonic_boom",

        "seeker_launcher",
        "",
        "dark_visor",
        "echo_visor",

        "morph_ball_bomb",
        "power_bomb",
        "boost_ball",
        "spider_ball",

        "space_jump_boots",
        "gravity_boost",
        "grapple_beam",
        "screw_attack",

        "dark_suit",
        "light_suit",
        "",
        "energy_transfer_module",

        "violet_translator",
        "amber_translator",
        "emerald_translator",
        "cobalt_translator",
    ],
};

let keys_order = [
    "dark_agon_key",
    "dark_torvus_key",
    "ing_hive_key",
    "sky_temple_key",
];

let item_list = items.upgrades.concat(items.expansions)
for (let k of keys_order) {
    for (let n = 1; n <= items.keys[k]; n++) {
        item_list.push(k + "_" + String(n))
    };
};

function formatted_name(item_name) {
    return item_name.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
};

function set_toggle(set, value, boolean) {
    if (boolean === undefined) {
        boolean = !set.has(value);
    };

    if (boolean) {
        set.add(value);
    } else {
        set.delete(value);
    };
};

function divmod(a, b) {
    let q = Math.floor(a / b)
    return [q, a - (b * q)];
};

function clear_children(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    };
};

let timer_state = {
    running: false,
    time: 0,
    time_before_last_start: 0,
    time_of_last_start: Date.now(),
};

function update_timer() {
    timer_state.time = timer_state.time_before_last_start + (timer_state.running ? (Date.now() - timer_state.time_of_last_start) : 0);

    let time = timer_state.time;
    let h, m, s, ms;
    [h, time] = divmod(time, 60 * 60 * 1000);
    [m, time] = divmod(time, 60 * 1000);
    [s, ms] = divmod(time, 1000);

    document.getElementById("timer-h").innerText = h > 0 ? String(h) + ":" : "";
    document.getElementById("timer-m").innerText = String(m).padStart(2, "0") + ":";
    document.getElementById("timer-s").innerText = String(s).padStart(2, "0");
    document.getElementById("timer-ms").innerText = "." + String(ms).padStart(3, "0");
};
window.setInterval(update_timer, 10);

let timer = document.getElementById("timer");
function on_timer_toggle() {
    timer_state.running = !timer_state.running;
    if (timer_state.running) {
        timer_state.time_of_last_start = Date.now();
    } else {
        timer_state.time_before_last_start = timer_state.time;
    };
};

timer.addEventListener("click", event => on_timer_toggle())
document.body.addEventListener("keyup",
    function(event) {
        if (event.key == "Enter") {
            on_timer_toggle();
        };
    }
);

let tracker_state = {
    upgrades_collected: new Set(),
    expansion_counts: {
        energy_tank: 0,
        missile_expansion: 0,
        power_bomb_expansion: 0,
        beam_ammo_expansion: 0,
        dark_ammo_expansion: 0,
        light_ammo_expansion: 0,
    },
    keys_collected: {
        dark_agon_key: new Set(),
        dark_torvus_key: new Set(),
        ing_hive_key: new Set(),
        sky_temple_key: new Set(),
    }
}

function update_trackers() {
    update_split_ammo();

    for (let u of items.upgrades) {
        document.getElementById(u).classList.toggle("collected", tracker_state.upgrades_collected.has(u));
        document.getElementById(u + "-box").classList.toggle("collected", tracker_state.upgrades_collected.has(u));
    };
    update_expansion_texts();
    for (let k of keys_order) {
        for (let n = 1; n <= items.keys[k]; n++) {
            let kn = k + "_" + String(n);
            document.getElementById(kn).classList.toggle("collected", tracker_state.keys_collected[k].has(n));
            document.getElementById(kn + "-box").classList.toggle("collected", tracker_state.keys_collected[k].has(n));
        };
    };
    update_key_texts();
    update_percentage();
}

function update_expansion_texts() {
    for (let e of items.expansions) {
        let count = document.getElementById("S-" + e + "-count").valueAsNumber
        if (tracker_state.expansion_counts[e] > count) {
            tracker_state.expansion_counts[e] = count;
        };
        document.getElementById(e + "-count").innerText = "× " + String(tracker_state.expansion_counts[e]) + "/" + String(count);

        if (e == "beam_ammo_expansion") {
            let dark_total = tracker_state.expansion_counts[e] * document.getElementById("S-beam_ammo_expansion-per").valueAsNumber;
            if (tracker_state.upgrades_collected.has("dark_beam")) {
                dark_total += document.getElementById("S-dark-ammo-given").valueAsNumber;
            };
            let light_total = tracker_state.expansion_counts[e] * document.getElementById("S-beam_ammo_expansion-per").valueAsNumber;
            if (tracker_state.upgrades_collected.has("light_beam")) {
                light_total += document.getElementById("S-light-ammo-given").valueAsNumber;
            };
            if (tracker_state.upgrades_collected.has("annihilator_beam")) {
                let annihilator_ammo = document.getElementById("S-annihilator-ammo-given").valueAsNumber
                dark_total += annihilator_ammo;
                light_total += annihilator_ammo;
            };
            document.getElementById(e + "-total").innerText = "(total: " + String(dark_total) + " D, " + String(light_total) + " L)";
        } else {
            let total = 0;
            if (e == "energy_tank") {
                total += 99;
            } else if (e == "missile_expansion") {
                if (tracker_state.upgrades_collected.has("missile_launcher")) {
                    total += document.getElementById("S-missiles-given-launcher").valueAsNumber;
                };
                if (tracker_state.upgrades_collected.has("seeker_launcher")) {
                    total += document.getElementById("S-missiles-given-seeker").valueAsNumber;
                };
            } else if (e == "power_bomb_expansion" && tracker_state.upgrades_collected.has("power_bomb")) {
                total += document.getElementById("S-power-bombs-given").valueAsNumber;
            } else if (e == "dark_ammo_expansion") {
                if (tracker_state.upgrades_collected.has("dark_beam")) {
                    total += document.getElementById("S-dark-ammo-given").valueAsNumber;
                };
                if (tracker_state.upgrades_collected.has("annihilator_beam")) {
                    total += document.getElementById("S-annihilator-ammo-given").valueAsNumber;
                };
            } else if (e == "light_ammo_expansion") {
                if (tracker_state.upgrades_collected.has("light_beam")) {
                    total += document.getElementById("S-light-ammo-given").valueAsNumber;
                };
                if (tracker_state.upgrades_collected.has("annihilator_beam")) {
                    total += document.getElementById("S-annihilator-ammo-given").valueAsNumber;
                };
            };
            total += tracker_state.expansion_counts[e] * document.getElementById("S-" + e + "-per").valueAsNumber
            document.getElementById(e + "-total").innerText = "(total: " + String(total) + ")";
        };
    };
};

function update_percentage() {
    // Note: ETM and keys don't count toward the in-game percentage
    let settings = get_settings();

    let num_collected = tracker_state.upgrades_collected.size
    if (tracker_state.upgrades_collected.has("energy_transfer_module")) {
        num_collected--;
    };
    for (let count of Object.values(tracker_state.expansion_counts)) {
        num_collected += count;
    };

    let num_items = 25;
    for (let e_settings of Object.values(get_settings().expansions)) {
        num_items += e_settings.count;
    };

    if (settings.ammo_split) {
        num_collected -= tracker_state.expansion_counts["beam_ammo_expansion"];
        num_items -= settings.expansions.beam_ammo_expansion.count;
    } else {
        num_collected -= tracker_state.expansion_counts["dark_ammo_expansion"];
        num_collected -= tracker_state.expansion_counts["light_ammo_expansion"];
        num_items -= settings.expansions.dark_ammo_expansion.count;
        num_items -= settings.expansions.light_ammo_expansion.count;
    };

    document.getElementById("percentage").innerText = "Items collected: " + String(num_collected) + "/" + String(num_items) + " (" + String(Math.round(100 * num_collected / num_items)) + "%)"
};

function update_key_texts() {
    for (let k of keys_order) {
        let k_count = document.getElementById(k + "-count")
        k_count.innerText = "× " + String(tracker_state.keys_collected[k].size) + "/" + String(items.keys[k]);
    };
}

let ammo_elts = {
    split: [
        "dark_ammo_expansion",
        "dark_ammo_expansion-box",
        "dark_ammo_expansion-count",
        "dark_ammo_expansion-total",
        "light_ammo_expansion",
        "light_ammo_expansion-box",
        "light_ammo_expansion-count",
        "light_ammo_expansion-total",
    ],
    nosplit: [
        "beam_ammo_expansion",
        "beam_ammo_expansion-box",
        "beam_ammo_expansion-count",
        "beam_ammo_expansion-total",
    ]
};

function update_split_ammo() {
    let split = document.getElementById("S-ammo-split").checked;
    for (let a_elt of ammo_elts.split) {
        document.getElementById(a_elt).hidden = !split;
    };
    for (let a_elt of ammo_elts.nosplit) {
        document.getElementById(a_elt).hidden = split;
    };
    document.getElementById("S-beam_ammo_expansion-per").disabled = split;
    document.getElementById("S-beam_ammo_expansion-count").disabled = split;
    document.getElementById("S-dark_ammo_expansion-per").disabled = !split;
    document.getElementById("S-dark_ammo_expansion-count").disabled = !split;
    document.getElementById("S-light_ammo_expansion-per").disabled = !split;
    document.getElementById("S-light_ammo_expansion-count").disabled = !split;
};

function upgrade_onclick(u) {
    return function() {
        set_toggle(tracker_state.upgrades_collected, u);
        update_trackers();
    };
};

let upgrade_divs = {};
for (let u of items.upgrades) {
    let u_div = document.createElement("div");
    u_div.id = u + "-box";
    u_div.className = "image-box";
    u_div.addEventListener("click", upgrade_onclick(u));
    upgrade_divs[u] = u_div;

    let u_img = document.createElement("img");
    u_img.id = u;
    u_img.className = "upgrade";
    u_img.src = "images/" + u + ".gif";
    u_img.title = formatted_name(u);
    u_div.appendChild(u_img);
};

function apply_upgrade_grid_dimensions(dim_str) {
    let [rows, columns] = dim_str.split("×");
//     rows = Number(rows);
//     columns = Number(columns);
    document.documentElement.style.setProperty("--upgrade-grid-rows", rows);
    document.documentElement.style.setProperty("--upgrade-grid-columns", columns);

    let upgrade_tracker = document.getElementById("upgrade-tracker");
    clear_children(upgrade_tracker);
    let layout = upgrade_grid_layouts[dim_str]
    for (let u of layout) {
        if (u == "") {
            upgrade_tracker.appendChild(document.createElement("div"));
        } else {
            upgrade_tracker.appendChild(upgrade_divs[u]);
        };
    };

    let hidden_upgrade_container = document.getElementById("hidden-upgrades");
    for (let u of items.upgrades) {
        if (layout.indexOf(u) == -1) {
            hidden_upgrade_container.appendChild(upgrade_divs[u]);
        };
    };

    update_trackers();
}

function expansion_onclick(e) {
    return function(event) {
        if (event.shiftKey && tracker_state.expansion_counts[e] > 0) {
            tracker_state.expansion_counts[e]--;
        } else if (!event.shiftKey && tracker_state.expansion_counts[e] < document.getElementById("S-" + e + "-count").valueAsNumber) {
            tracker_state.expansion_counts[e]++;
        };
        update_trackers();
    };
};

let expansion_tracker = document.getElementById("expansion-tracker");
for (let e of items.expansions) {
    let e_div = document.createElement("div");
    e_div.id = e + "-box";
    e_div.className = "image-box";
    e_div.addEventListener("click", expansion_onclick(e));
    expansion_tracker.appendChild(e_div);

    let e_img = document.createElement("img");
    e_img.id = e;
    e_img.src = "images/" + e + ".gif";
    e_img.title = formatted_name(e);
    e_div.appendChild(e_img);

    let e_count = document.createElement("div");
    e_count.id = e + "-count";
    e_count.className = "count-text";
    expansion_tracker.appendChild(e_count);

    let e_total = document.createElement("div");
    e_total.id = e + "-total";
    e_total.className = "count-text";
    expansion_tracker.appendChild(e_total);

    document.getElementById("S-" + e + "-per").addEventListener("change", event => update_trackers())
    document.getElementById("S-" + e + "-count").addEventListener("change", event => update_trackers())
};

function key_onclick(k, n) {
    let kn = k + "_" + String(n);
    return function() {
        set_toggle(tracker_state.keys_collected[k], n)
        update_trackers();
    };
};

function key_numeric_onclick(k) {
    return function(event) {
        if (event.shiftKey) {
            for (let n = items.keys[k]; n >= 1; n--) {
                if (tracker_state.keys_collected[k].has(n)) {
                    key_onclick(k, n)();
                    return;
                };
            };
        } else {
            for (let n = 1; n <= items.keys[k]; n++) {
                if (!tracker_state.keys_collected[k].has(n)) {
                    key_onclick(k, n)();
                    return;
                };
            };
        };
    };
};

let key_tracker_individual = document.getElementById("key-tracker-individual");
for (let k of keys_order) {
    let k_label = document.createElement("div");
    k_label.className = "key-label";
    k_label.innerText = formatted_name(k) + "s:";
    key_tracker_individual.appendChild(k_label)

    for (let n = 1; n <= items.keys[k]; n++) {
        if (n == 4 || n == 7) {
            key_tracker_individual.appendChild(document.createElement("div"));
        };

        let kn = k + "_" + String(n);

        let k_div = document.createElement("div");
        k_div.id = kn + "-box";
        k_div.className = "image-box";
        k_div.addEventListener("click", key_onclick(k, n));
        key_tracker_individual.appendChild(k_div);

        let k_img = document.createElement("img");
        k_img.id = kn;
        k_img.className = "key";
        k_img.src = "images/" + k + ".gif";
        k_img.title = formatted_name(kn);
        k_div.appendChild(k_img);
    };
};

let key_tracker_numeric = document.getElementById("key-tracker-numeric");
for (let k of keys_order) {
    let k_cell = document.createElement("div");
    k_cell.className = "key-numeric-cell";
    key_tracker_numeric.appendChild(k_cell);

    let k_label = document.createElement("div");
    k_label.className = "key-numeric-label";
    k_label.innerText = formatted_name(k) + "s";
    k_cell.appendChild(k_label);

    let k_entry = document.createElement("div");
    k_entry.classList.add("tracker");
    k_entry.classList.add("key-numeric-entry");
    k_cell.appendChild(k_entry);

    let k_div = document.createElement("div");
    k_div.id = k + "-box";
    k_div.className = "image-box";
    k_div.addEventListener("click", key_numeric_onclick(k));
    k_entry.appendChild(k_div);

    let k_img = document.createElement("img");
    k_img.id = k;
    k_img.src = "images/" + k + ".gif";
    k_img.title = formatted_name(k);
    k_div.appendChild(k_img);

    let k_count = document.createElement("div");
    k_count.id = k + "-count";
    k_count.className = "count-text";
    k_entry.appendChild(k_count);
};

document.getElementById("save-state").addEventListener("click",
    function() {
        window.localStorage.setItem("state", JSON.stringify(tracker_state,
            function(key, value) {
                if (Object.prototype.toString.call(value) == "[object Set]") {
                    return Array.from(value);
                } else {
                    return value;
                };
            }
        ))
    }
);
document.getElementById("load-state").addEventListener("click",
    function() {
        let tracker_state_json = window.localStorage.getItem("state");
        if (tracker_state_json !== null) {
            tracker_state = JSON.parse(tracker_state_json,
                function(key, value) {
                    if (Array.isArray(value)) {
                        return new Set(value);
                    } else {
                        return value;
                    };
                }
            );
            update_trackers();
        };
    }
);
document.getElementById("reset-state").addEventListener("click",
    function(event) {
        tracker_state.upgrades_collected.clear();
        for (let e of items.expansions) {
            tracker_state.expansion_counts[e] = 0;
        };
        for (let k of keys_order) {
            tracker_state.keys_collected[k].clear();
        };
        update_trackers();
    }
);

document.getElementById("reset-timer").addEventListener("click",
    function(event) {
        timer_state.running = false;
        timer_state.time_before_last_start = 0;
        timer_state.time_of_last_start = Date.now();
        update_timer();
    }
)

document.getElementById("S-dark").addEventListener("change", event => document.body.classList.toggle("light", !event.target.checked));

let animation_checkbox = document.getElementById("S-animation");
animation_checkbox.addEventListener("change",
    function(event) {
        let dir = (event.target.checked) ? "images" : "images-noanim"
        for (let i of item_list) {
            document.getElementById(i).src = dir + "/" + i.replace(/_\d$/, "") + ".gif";
        };
        for (let k of keys_order) {
            document.getElementById(k).src = dir + "/" + k + ".gif";
        };
    }
);

document.getElementById("S-font-size").addEventListener("change",
    function(event) {
        let checked = event.target.checked;
        document.documentElement.style.setProperty("--tracker-font-size", checked ? "120%" : "140%");
        document.documentElement.style.setProperty("--tracker-font-size-compact", checked ? "100%" : "120%");
    }
);

let boxes_checkbox = document.getElementById("S-boxes");
boxes_checkbox.addEventListener("change", event => document.getElementById("tracker-column").classList.toggle("boxes", event.target.checked));

let compact_checkbox = document.getElementById("S-compact");
compact_checkbox.addEventListener("change", event => document.getElementById("tracker-column").classList.toggle("compact", event.target.checked));

document.getElementById("S-upgrade-grid-dimensions").addEventListener("change", event => apply_upgrade_grid_dimensions(event.target.value));

document.getElementById("S-timer").addEventListener("change", event => document.getElementById("timer").hidden = !event.target.checked);

document.getElementById("S-expansion-tracker").addEventListener("change",
    function(event) {
        document.getElementById("expansion-tracker-container").hidden = !event.target.checked;
        document.getElementById("S-percentage").disabled = !event.target.checked;
    }
)
document.getElementById("S-percentage").addEventListener("change", event => document.getElementById("percentage").hidden = !event.target.checked)

document.getElementById("S-individual-keys").addEventListener("change",
    function(event) {
        document.getElementById("key-tracker-individual").hidden = !event.target.checked;
        document.getElementById("key-tracker-numeric").hidden = event.target.checked;
    }
)

let ammo_split_checkbox = document.getElementById("S-ammo-split");
ammo_split_checkbox.addEventListener("change", event => update_trackers());

let number_given_inputs = [
    "S-missiles-given-launcher",
    "S-missiles-given-seeker",
    "S-power-bombs-given",
    "S-dark-ammo-given",
    "S-light-ammo-given",
    "S-annihilator-ammo-given",
];
for (let ng_input of number_given_inputs) {
    document.getElementById(ng_input).addEventListener("change", event => update_trackers())
};

function get_settings() {
    let settings =  {
        general: {
            dark: document.getElementById("S-dark").checked,
            animation: document.getElementById("S-animation").checked,
            boxes: document.getElementById("S-boxes").checked,
            compact: document.getElementById("S-compact").checked,
            timer: document.getElementById("S-timer").checked,
            expansion_tracker: document.getElementById("S-expansion-tracker").checked,
            percentage: document.getElementById("S-percentage").checked,
            individual_keys: document.getElementById("S-individual-keys").checked,
        },
        ammo_split: document.getElementById("S-ammo-split").checked,

        layout: {
            reduce_tracker_font_size: document.getElementById("S-font-size").checked,
            upgrade_grid_dimensions: document.getElementById("S-upgrade-grid-dimensions").value,
        },

        given: {
            missile_launcher: document.getElementById("S-missiles-given-launcher").valueAsNumber,
            seeker_launcher: document.getElementById("S-missiles-given-seeker").valueAsNumber,
            power_bomb: document.getElementById("S-power-bombs-given").valueAsNumber,
            dark_beam: document.getElementById("S-dark-ammo-given").valueAsNumber,
            light_beam: document.getElementById("S-light-ammo-given").valueAsNumber,
            annihilator_beam: document.getElementById("S-annihilator-ammo-given").valueAsNumber,
        },
        expansions: {},
    };

    for (let e of items.expansions) {
        settings.expansions[e] = {
            count: document.getElementById("S-" + e + "-count").valueAsNumber,
            per: document.getElementById("S-" + e + "-per").valueAsNumber,
        };
    };

    return settings;
};

function set_settings(settings) {
    if (settings.hasOwnProperty("general")) {
        if ("dark" in settings.general) {
            document.getElementById("S-dark").checked = settings.general.dark;
        };
        if ("animations" in settings.general) {
            document.getElementById("S-animation").checked = settings.general.animation;
        };
        if ("boxes" in settings.general) {
            document.getElementById("S-boxes").checked = settings.general.boxes;
        };
        if ("compact" in settings.general) {
            document.getElementById("S-compact").checked = settings.general.compact;
        };
        if ("timer" in settings.general) {
            document.getElementById("S-timer").checked = settings.general.timer;
        };
        if ("expansion_tracker" in settings.general) {
            document.getElementById("S-expansion-tracker").checked = settings.general.expansion_tracker;
        };
        if ("percentage" in settings.general) {
            document.getElementById("S-percentage").checked = settings.general.percentage;
        };
        if ("individual_keys" in settings.general) {
            document.getElementById("S-individual-keys").checked = settings.general.individual_keys;
        };
    };
    if ("ammo_split" in settings) {
        document.getElementById("S-ammo-split").checked = settings.ammo_split;
    };

    if (settings.hasOwnProperty("layout")) {
        if ("upgrade_grid_dimensions" in settings.layout) {
            document.getElementById("S-upgrade-grid-dimensions").value = settings.layout.upgrade_grid_dimensions;
        };
        if ("reduce_tracker_font_size" in settings.layout) {
            document.getElementById("S-font-size").checked = settings.layout.reduce_tracker_font_size;
        };
    };

    if (settings.hasOwnProperty("given")) {
        if ("missile_launcher" in settings.given) {
            document.getElementById("S-missiles-given-launcher").value = settings.given.missile_launcher;
        };
        if ("seeker_launcher" in settings.given) {
            document.getElementById("S-missiles-given-seeker").value = settings.given.seeker_launcher;
        };
        if ("power_bomb" in settings.given) {
            document.getElementById("S-power-bombs-given").value = settings.given.power_bomb;
        };
        if ("dark_beam" in settings.given) {
            document.getElementById("S-dark-ammo-given").value = settings.given.dark_beam;
        };
        if ("light_beam" in settings.given) {
            document.getElementById("S-light-ammo-given").value = settings.given.light_beam;
        };
        if ("annihilator_beam" in settings.given) {
            document.getElementById("S-annihilator-ammo-given").value = settings.given.annihilator_beam;
        };
    };
    if (settings.hasOwnProperty("expansions")) {
        for (let e of items.expansions) {
            if (e in settings.expansions) {
                document.getElementById("S-" + e + "-count").value = settings.expansions[e].count;
                document.getElementById("S-" + e + "-per").value = settings.expansions[e].per;
            };
        };
    };

    for (let input of document.getElementById("settings").elements) {
        input.dispatchEvent(new Event("change"));
    };
};

let vanilla_settings = {
    ammo_split: false,

    given: {
        missile_launcher: 5,
        seeker_launcher: 5,
        power_bomb: 2,
        dark_beam: 50,
        light_beam: 50,
        annihilator_beam: 0,
    },

    expansions: {
        energy_tank: {
            count: 14,
            per: 100,
        },
        missile_expansion: {
            count: 49,
            per: 5,
        },
        power_bomb_expansion: {
            count: 8,
            per: 1,
        },
        beam_ammo_expansion: {
            count: 4,
            per: 50,
        },
        dark_ammo_expansion: {
            count: 0,
            per: 0,
        },
        light_ammo_expansion: {
            count: 0,
            per: 0,
        },
    },
};

let randovania_settings = {
    ammo_split: true,

    given: {
        missile_launcher: 5,
        seeker_launcher: 5,
        power_bomb: 2,
        dark_beam: 50,
        light_beam: 50,
        annihilator_beam: 0,
    },

    expansions: {
        energy_tank: {
            count: 14,
            per: 100,
        },
        missile_expansion: {
            count: 33,
            per: 5,
        },
        power_bomb_expansion: {
            count: 8,
            per: 1,
        },
        beam_ammo_expansion: {
            count: 0,
            per: 0,
        },
        dark_ammo_expansion: {
            count: 10,
            per: 20,
        },
        light_ammo_expansion: {
            count: 10,
            per: 20,
        },
    },
};

function load_settings() {
    let settings_json = window.localStorage.getItem("settings");
    if (settings_json !== null) {
        set_settings(JSON.parse(settings_json));
        update_trackers();
    };
};

document.getElementById("save-settings").addEventListener("click", event => window.localStorage.setItem("settings", JSON.stringify(get_settings())));
document.getElementById("load-settings").addEventListener("click", load_settings);
document.getElementById("reset-settings-vanilla").addEventListener("click", event => set_settings(vanilla_settings));
document.getElementById("reset-settings-randovania").addEventListener("click", event => set_settings(randovania_settings));

apply_upgrade_grid_dimensions("4×7");
set_settings(randovania_settings);
load_settings();