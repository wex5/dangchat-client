define(function(require) {
	var emoji = [ {
		"name" : "smile",
		"value" : "&#x1f604",
		"category" : "人"
	}, {
		"name" : "smiley",
		"value" : "&#x1f603",
		"category" : "人"
	}, {
		"name" : "grinning",
		"value" : "&#x1f600",
		"category" : "人"
	}, {
		"name" : "blush",
		"value" : "&#x1f60a",
		"category" : "人"
	}, {
		"name" : "relaxed",
		"value" : "&#x263a",
		"category" : "人"
	}, {
		"name" : "wink",
		"value" : "&#x1f609",
		"category" : "人"
	}, {
		"name" : "heart-eyes",
		"value" : "&#x1f60d",
		"category" : "人"
	}, {
		"name" : "kissing-heart",
		"value" : "&#x1f618",
		"category" : "人"
	}, {
		"name" : "kissing-closed-eyes",
		"value" : "&#x1f61a",
		"category" : "人"
	}, {
		"name" : "kissing",
		"value" : "&#x1f617",
		"category" : "人"
	}, {
		"name" : "kissing-smiling-eyes",
		"value" : "&#x1f619",
		"category" : "人"
	}, {
		"name" : "stuck-out-tongue-winking-eye",
		"value" : "&#x1f61c",
		"category" : "人"
	}, {
		"name" : "stuck-out-tongue-closed-eyes",
		"value" : "&#x1f61d",
		"category" : "人"
	}, {
		"name" : "stuck-out-tongue",
		"value" : "&#x1f61b",
		"category" : "人"
	}, {
		"name" : "flushed",
		"value" : "&#x1f633",
		"category" : "人"
	}, {
		"name" : "grin",
		"value" : "&#x1f601",
		"category" : "人"
	}, {
		"name" : "pensive",
		"value" : "&#x1f614",
		"category" : "人"
	}, {
		"name" : "satisfied",
		"value" : "&#x1f60c",
		"category" : "人"
	}, {
		"name" : "unamused",
		"value" : "&#x1f612",
		"category" : "人"
	}, {
		"name" : "disappointed",
		"value" : "&#x1f61e",
		"category" : "人"
	}, {
		"name" : "persevere",
		"value" : "&#x1f623",
		"category" : "人"
	}, {
		"name" : "cry",
		"value" : "&#x1f622",
		"category" : "人"
	}, {
		"name" : "joy",
		"value" : "&#x1f602",
		"category" : "人"
	}, {
		"name" : "sob",
		"value" : "&#x1f62d",
		"category" : "人"
	}, {
		"name" : "sleepy",
		"value" : "&#x1f62a",
		"category" : "人"
	}, {
		"name" : "relieved",
		"value" : "&#x1f625",
		"category" : "人"
	}, {
		"name" : "cold-sweat",
		"value" : "&#x1f630",
		"category" : "人"
	}, {
		"name" : "sweat-smile",
		"value" : "&#x1f605",
		"category" : "人"
	}, {
		"name" : "sweat",
		"value" : "&#x1f613",
		"category" : "人"
	}, {
		"name" : "weary",
		"value" : "&#x1f629",
		"category" : "人"
	}, {
		"name" : "tired-face",
		"value" : "&#x1f62b",
		"category" : "人"
	}, {
		"name" : "fearful",
		"value" : "&#x1f628",
		"category" : "人"
	}, {
		"name" : "scream",
		"value" : "&#x1f631",
		"category" : "人"
	}, {
		"name" : "angry",
		"value" : "&#x1f620",
		"category" : "人"
	}, {
		"name" : "rage",
		"value" : "&#x1f621",
		"category" : "人"
	}, {
		"name" : "triumph",
		"value" : "&#x1f624",
		"category" : "人"
	}, {
		"name" : "confounded",
		"value" : "&#x1f616",
		"category" : "人"
	}, {
		"name" : "laughing",
		"value" : "&#x1f606",
		"category" : "人"
	}, {
		"name" : "yum",
		"value" : "&#x1f60b",
		"category" : "人"
	}, {
		"name" : "mask",
		"value" : "&#x1f637",
		"category" : "人"
	}, {
		"name" : "sunglasses",
		"value" : "&#x1f60e",
		"category" : "人"
	}, {
		"name" : "sleeping",
		"value" : "&#x1f634",
		"category" : "人"
	}, {
		"name" : "dizzy-face",
		"value" : "&#x1f635",
		"category" : "人"
	}, {
		"name" : "astonished",
		"value" : "&#x1f632",
		"category" : "人"
	}, {
		"name" : "worried",
		"value" : "&#x1f61f",
		"category" : "人"
	}, {
		"name" : "frowning",
		"value" : "&#x1f626",
		"category" : "人"
	}, {
		"name" : "anguished",
		"value" : "&#x1f627",
		"category" : "人"
	}, {
		"name" : "smiling-imp",
		"value" : "&#x1f608",
		"category" : "人"
	}, {
		"name" : "imp",
		"value" : "&#x1f47f",
		"category" : "人"
	}, {
		"name" : "open-mouth",
		"value" : "&#x1f62e",
		"category" : "人"
	}, {
		"name" : "grimacing",
		"value" : "&#x1f62c",
		"category" : "人"
	}, {
		"name" : "neutral-face",
		"value" : "&#x1f610",
		"category" : "人"
	}, {
		"name" : "confused",
		"value" : "&#x1f615",
		"category" : "人"
	}, {
		"name" : "hushed",
		"value" : "&#x1f62f",
		"category" : "人"
	}, {
		"name" : "no-mouth",
		"value" : "&#x1f636",
		"category" : "人"
	}, {
		"name" : "innocent",
		"value" : "&#x1f607",
		"category" : "人"
	}, {
		"name" : "smirk",
		"value" : "&#x1f60f",
		"category" : "人"
	}, {
		"name" : "expressionless",
		"value" : "&#x1f611",
		"category" : "人"
	}, {
		"name" : "man-with-gua-pi-mao",
		"value" : "&#x1f472",
		"category" : "人"
	}, {
		"name" : "man-with-turban",
		"value" : "&#x1f473",
		"category" : "人"
	}, {
		"name" : "cop",
		"value" : "&#x1f46e",
		"category" : "人"
	}, {
		"name" : "construction-worker",
		"value" : "&#x1f477",
		"category" : "人"
	}, {
		"name" : "guardsman",
		"value" : "&#x1f482",
		"category" : "人"
	}, {
		"name" : "baby",
		"value" : "&#x1f476",
		"category" : "人"
	}, {
		"name" : "boy",
		"value" : "&#x1f466",
		"category" : "人"
	}, {
		"name" : "girl",
		"value" : "&#x1f467",
		"category" : "人"
	}, {
		"name" : "man",
		"value" : "&#x1f468",
		"category" : "人"
	}, {
		"name" : "woman",
		"value" : "&#x1f469",
		"category" : "人"
	}, {
		"name" : "older-man",
		"value" : "&#x1f474",
		"category" : "人"
	}, {
		"name" : "older-woman",
		"value" : "&#x1f475",
		"category" : "人"
	}, {
		"name" : "person-with-blond-hair",
		"value" : "&#x1f471",
		"category" : "人"
	}, {
		"name" : "angel",
		"value" : "&#x1f47c",
		"category" : "人"
	}, {
		"name" : "princess",
		"value" : "&#x1f478",
		"category" : "人"
	}, {
		"name" : "smiley-cat",
		"value" : "&#x1f63a",
		"category" : "人"
	}, {
		"name" : "smile-cat",
		"value" : "&#x1f638",
		"category" : "人"
	}, {
		"name" : "heart-eyes-cat",
		"value" : "&#x1f63b",
		"category" : "人"
	}, {
		"name" : "kissing-cat",
		"value" : "&#x1f63d",
		"category" : "人"
	}, {
		"name" : "smirk-cat",
		"value" : "&#x1f63c",
		"category" : "人"
	}, {
		"name" : "scream-cat",
		"value" : "&#x1f640",
		"category" : "人"
	}, {
		"name" : "crying-cat-face",
		"value" : "&#x1f63f",
		"category" : "人"
	}, {
		"name" : "joy-cat",
		"value" : "&#x1f639",
		"category" : "人"
	}, {
		"name" : "pouting-cat",
		"value" : "&#x1f63e",
		"category" : "人"
	}, {
		"name" : "japanese-ogre",
		"value" : "&#x1f479",
		"category" : "人"
	}, {
		"name" : "japanese-goblin",
		"value" : "&#x1f47a",
		"category" : "人"
	}, {
		"name" : "see-no-evil",
		"value" : "&#x1f648",
		"category" : "人"
	}, {
		"name" : "hear-no-evil",
		"value" : "&#x1f649",
		"category" : "人"
	}, {
		"name" : "speak-no-evil",
		"value" : "&#x1f64a",
		"category" : "人"
	}, {
		"name" : "skull",
		"value" : "&#x1f480",
		"category" : "人"
	}, {
		"name" : "alien",
		"value" : "&#x1f47d",
		"category" : "人"
	}, {
		"name" : "poop",
		"value" : "&#x1f4a9",
		"category" : "人"
	}, {
		"name" : "fire",
		"value" : "&#x1f525",
		"category" : "人"
	}, {
		"name" : "sparkles",
		"value" : "&#x2728",
		"category" : "人"
	}, {
		"name" : "star2",
		"value" : "&#x1f31f",
		"category" : "人"
	}, {
		"name" : "dizzy",
		"value" : "&#x1f4ab",
		"category" : "人"
	}, {
		"name" : "boom",
		"value" : "&#x1f4a5",
		"category" : "人"
	}, {
		"name" : "anger",
		"value" : "&#x1f4a2",
		"category" : "人"
	}, {
		"name" : "sweat-drops",
		"value" : "&#x1f4a6",
		"category" : "人"
	}, {
		"name" : "droplet",
		"value" : "&#x1f4a7",
		"category" : "人"
	}, {
		"name" : "zzz",
		"value" : "&#x1f4a4",
		"category" : "人"
	}, {
		"name" : "dash",
		"value" : "&#x1f4a8",
		"category" : "人"
	}, {
		"name" : "ear",
		"value" : "&#x1f442",
		"category" : "人"
	}, {
		"name" : "eyes",
		"value" : "&#x1f440",
		"category" : "人"
	}, {
		"name" : "nose",
		"value" : "&#x1f443",
		"category" : "人"
	}, {
		"name" : "tongue",
		"value" : "&#x1f445",
		"category" : "人"
	}, {
		"name" : "lips",
		"value" : "&#x1f444",
		"category" : "人"
	}, {
		"name" : "thumbsup",
		"value" : "&#x1f44d",
		"category" : "人"
	}, {
		"name" : "thumbsdown",
		"value" : "&#x1f44e",
		"category" : "人"
	}, {
		"name" : "ok-hand",
		"value" : "&#x1f44c",
		"category" : "人"
	}, {
		"name" : "punch",
		"value" : "&#x1f44a",
		"category" : "人"
	}, {
		"name" : "fist",
		"value" : "&#x270a",
		"category" : "人"
	}, {
		"name" : "v",
		"value" : "&#x270c",
		"category" : "人"
	}, {
		"name" : "wave",
		"value" : "&#x1f44b",
		"category" : "人"
	}, {
		"name" : "hand",
		"value" : "&#x270b",
		"category" : "人"
	}, {
		"name" : "open-hands",
		"value" : "&#x1f450",
		"category" : "人"
	}, {
		"name" : "point-up-2",
		"value" : "&#x1f446",
		"category" : "人"
	}, {
		"name" : "point-down",
		"value" : "&#x1f447",
		"category" : "人"
	}, {
		"name" : "point-right",
		"value" : "&#x1f449",
		"category" : "人"
	}, {
		"name" : "point-left",
		"value" : "&#x1f448",
		"category" : "人"
	}, {
		"name" : "raised-hands",
		"value" : "&#x1f64c",
		"category" : "人"
	}, {
		"name" : "pray",
		"value" : "&#x1f64f",
		"category" : "人"
	}, {
		"name" : "point-up",
		"value" : "&#x261d",
		"category" : "人"
	}, {
		"name" : "clap",
		"value" : "&#x1f44f",
		"category" : "人"
	}, {
		"name" : "muscle",
		"value" : "&#x1f4aa",
		"category" : "人"
	}, {
		"name" : "walking",
		"value" : "&#x1f6b6",
		"category" : "人"
	}, {
		"name" : "runner",
		"value" : "&#x1f3c3",
		"category" : "人"
	}, {
		"name" : "dancer",
		"value" : "&#x1f483",
		"category" : "人"
	}, {
		"name" : "couple",
		"value" : "&#x1f46b",
		"category" : "人"
	}, {
		"name" : "family",
		"value" : "&#x1f46a",
		"category" : "人"
	}, {
		"name" : "two-men-holding-hands",
		"value" : "&#x1f46c",
		"category" : "人"
	}, {
		"name" : "two-women-holding-hands",
		"value" : "&#x1f46d",
		"category" : "人"
	}, {
		"name" : "couplekiss",
		"value" : "&#x1f48f",
		"category" : "人"
	}, {
		"name" : "couple-with-heart",
		"value" : "&#x1f491",
		"category" : "人"
	}, {
		"name" : "dancers",
		"value" : "&#x1f46f",
		"category" : "人"
	}, {
		"name" : "ok-woman",
		"value" : "&#x1f646",
		"category" : "人"
	}, {
		"name" : "no-good",
		"value" : "&#x1f645",
		"category" : "人"
	}, {
		"name" : "information-desk-person",
		"value" : "&#x1f481",
		"category" : "人"
	}, {
		"name" : "raised-hand",
		"value" : "&#x1f64b",
		"category" : "人"
	}, {
		"name" : "massage",
		"value" : "&#x1f486",
		"category" : "人"
	}, {
		"name" : "haircut",
		"value" : "&#x1f487",
		"category" : "人"
	}, {
		"name" : "nail-care",
		"value" : "&#x1f485",
		"category" : "人"
	}, {
		"name" : "bride-with-veil",
		"value" : "&#x1f470",
		"category" : "人"
	}, {
		"name" : "person-with-pouting-face",
		"value" : "&#x1f64e",
		"category" : "人"
	}, {
		"name" : "person-frowning",
		"value" : "&#x1f64d",
		"category" : "人"
	}, {
		"name" : "bow",
		"value" : "&#x1f647",
		"category" : "人"
	}, {
		"name" : "tophat",
		"value" : "&#x1f3a9",
		"category" : "人"
	}, {
		"name" : "crown",
		"value" : "&#x1f451",
		"category" : "人"
	}, {
		"name" : "womans-hat",
		"value" : "&#x1f452",
		"category" : "人"
	}, {
		"name" : "athletic-shoe",
		"value" : "&#x1f45f",
		"category" : "人"
	}, {
		"name" : "mans-shoe",
		"value" : "&#x1f45e",
		"category" : "人"
	}, {
		"name" : "sandal",
		"value" : "&#x1f461",
		"category" : "人"
	}, {
		"name" : "high-heel",
		"value" : "&#x1f460",
		"category" : "人"
	}, {
		"name" : "boot",
		"value" : "&#x1f462",
		"category" : "人"
	}, {
		"name" : "shirt",
		"value" : "&#x1f455",
		"category" : "人"
	}, {
		"name" : "necktie",
		"value" : "&#x1f454",
		"category" : "人"
	}, {
		"name" : "womans-clothes",
		"value" : "&#x1f45a",
		"category" : "人"
	}, {
		"name" : "dress",
		"value" : "&#x1f457",
		"category" : "人"
	}, {
		"name" : "running-shirt-with-sash",
		"value" : "&#x1f3bd",
		"category" : "人"
	}, {
		"name" : "jeans",
		"value" : "&#x1f456",
		"category" : "人"
	}, {
		"name" : "kimono",
		"value" : "&#x1f458",
		"category" : "人"
	}, {
		"name" : "bikini",
		"value" : "&#x1f459",
		"category" : "人"
	}, {
		"name" : "briefcase",
		"value" : "&#x1f4bc",
		"category" : "人"
	}, {
		"name" : "handbag",
		"value" : "&#x1f45c",
		"category" : "人"
	}, {
		"name" : "pouch",
		"value" : "&#x1f45d",
		"category" : "人"
	}, {
		"name" : "purse",
		"value" : "&#x1f45b",
		"category" : "人"
	}, {
		"name" : "eyeglasses",
		"value" : "&#x1f453",
		"category" : "人"
	}, {
		"name" : "ribbon",
		"value" : "&#x1f380",
		"category" : "人"
	}, {
		"name" : "closed-umbrella",
		"value" : "&#x1f302",
		"category" : "人"
	}, {
		"name" : "lipstick",
		"value" : "&#x1f484",
		"category" : "人"
	}, {
		"name" : "yellow-heart",
		"value" : "&#x1f49b",
		"category" : "人"
	}, {
		"name" : "blue-heart",
		"value" : "&#x1f499",
		"category" : "人"
	}, {
		"name" : "purple-heart",
		"value" : "&#x1f49c",
		"category" : "人"
	}, {
		"name" : "green-heart",
		"value" : "&#x1f49a",
		"category" : "人"
	}, {
		"name" : "heart",
		"value" : "&#x2764",
		"category" : "人"
	}, {
		"name" : "broken-heart",
		"value" : "&#x1f494",
		"category" : "人"
	}, {
		"name" : "heartpulse",
		"value" : "&#x1f497",
		"category" : "人"
	}, {
		"name" : "heartbeat",
		"value" : "&#x1f493",
		"category" : "人"
	}, {
		"name" : "two-hearts",
		"value" : "&#x1f495",
		"category" : "人"
	}, {
		"name" : "sparkling-heart",
		"value" : "&#x1f496",
		"category" : "人"
	}, {
		"name" : "revolving-hearts",
		"value" : "&#x1f49e",
		"category" : "人"
	}, {
		"name" : "love-letter",
		"value" : "&#x1f48c",
		"category" : "人"
	}, {
		"name" : "cupid",
		"value" : "&#x1f498",
		"category" : "人"
	}, {
		"name" : "kiss",
		"value" : "&#x1f48b",
		"category" : "人"
	}, {
		"name" : "ring",
		"value" : "&#x1f48d",
		"category" : "人"
	}, {
		"name" : "gem",
		"value" : "&#x1f48e",
		"category" : "人"
	}, {
		"name" : "bust-in-silhouette",
		"value" : "&#x1f464",
		"category" : "人"
	}, {
		"name" : "busts-in-silhouette",
		"value" : "&#x1f465",
		"category" : "人"
	}, {
		"name" : "speech-balloon",
		"value" : "&#x1f4ac",
		"category" : "人"
	}, {
		"name" : "feet",
		"value" : "&#x1f463",
		"category" : "人"
	}, {
		"name" : "thought-balloon",
		"value" : "&#x1f4ad",
		"category" : "人"
	}, {
		"name" : "dog",
		"value" : "&#x1f436",
		"category" : "自然"
	}, {
		"name" : "wolf",
		"value" : "&#x1f43a",
		"category" : "自然"
	}, {
		"name" : "cat",
		"value" : "&#x1f431",
		"category" : "自然"
	}, {
		"name" : "mouse",
		"value" : "&#x1f42d",
		"category" : "自然"
	}, {
		"name" : "hamster",
		"value" : "&#x1f439",
		"category" : "自然"
	}, {
		"name" : "rabbit",
		"value" : "&#x1f430",
		"category" : "自然"
	}, {
		"name" : "frog",
		"value" : "&#x1f438",
		"category" : "自然"
	}, {
		"name" : "tiger",
		"value" : "&#x1f42f",
		"category" : "自然"
	}, {
		"name" : "koala",
		"value" : "&#x1f428",
		"category" : "自然"
	}, {
		"name" : "bear",
		"value" : "&#x1f43b",
		"category" : "自然"
	}, {
		"name" : "pig",
		"value" : "&#x1f437",
		"category" : "自然"
	}, {
		"name" : "pig-nose",
		"value" : "&#x1f43d",
		"category" : "自然"
	}, {
		"name" : "cow",
		"value" : "&#x1f42e",
		"category" : "自然"
	}, {
		"name" : "boar",
		"value" : "&#x1f417",
		"category" : "自然"
	}, {
		"name" : "monkey-face",
		"value" : "&#x1f435",
		"category" : "自然"
	}, {
		"name" : "monkey",
		"value" : "&#x1f412",
		"category" : "自然"
	}, {
		"name" : "horse",
		"value" : "&#x1f434",
		"category" : "自然"
	}, {
		"name" : "sheep",
		"value" : "&#x1f411",
		"category" : "自然"
	}, {
		"name" : "elephant",
		"value" : "&#x1f418",
		"category" : "自然"
	}, {
		"name" : "panda-face",
		"value" : "&#x1f43c",
		"category" : "自然"
	}, {
		"name" : "penguin",
		"value" : "&#x1f427",
		"category" : "自然"
	}, {
		"name" : "bird",
		"value" : "&#x1f426",
		"category" : "自然"
	}, {
		"name" : "baby-chick",
		"value" : "&#x1f424",
		"category" : "自然"
	}, {
		"name" : "hatched-chick",
		"value" : "&#x1f425",
		"category" : "自然"
	}, {
		"name" : "hatching-chick",
		"value" : "&#x1f423",
		"category" : "自然"
	}, {
		"name" : "chicken",
		"value" : "&#x1f414",
		"category" : "自然"
	}, {
		"name" : "snake",
		"value" : "&#x1f40d",
		"category" : "自然"
	}, {
		"name" : "turtle",
		"value" : "&#x1f422",
		"category" : "自然"
	}, {
		"name" : "bug",
		"value" : "&#x1f41b",
		"category" : "自然"
	}, {
		"name" : "honeybee",
		"value" : "&#x1f41d",
		"category" : "自然"
	}, {
		"name" : "ant",
		"value" : "&#x1f41c",
		"category" : "自然"
	}, {
		"name" : "beetle",
		"value" : "&#x1f41e",
		"category" : "自然"
	}, {
		"name" : "snail",
		"value" : "&#x1f40c",
		"category" : "自然"
	}, {
		"name" : "octopus",
		"value" : "&#x1f419",
		"category" : "自然"
	}, {
		"name" : "shell",
		"value" : "&#x1f41a",
		"category" : "自然"
	}, {
		"name" : "tropical-fish",
		"value" : "&#x1f420",
		"category" : "自然"
	}, {
		"name" : "fish",
		"value" : "&#x1f41f",
		"category" : "自然"
	}, {
		"name" : "dolphin",
		"value" : "&#x1f42c",
		"category" : "自然"
	}, {
		"name" : "whale",
		"value" : "&#x1f433",
		"category" : "自然"
	}, {
		"name" : "whale2",
		"value" : "&#x1f40b",
		"category" : "自然"
	}, {
		"name" : "cow2",
		"value" : "&#x1f404",
		"category" : "自然"
	}, {
		"name" : "ram",
		"value" : "&#x1f40f",
		"category" : "自然"
	}, {
		"name" : "rat",
		"value" : "&#x1f400",
		"category" : "自然"
	}, {
		"name" : "water-buffalo",
		"value" : "&#x1f403",
		"category" : "自然"
	}, {
		"name" : "tiger2",
		"value" : "&#x1f405",
		"category" : "自然"
	}, {
		"name" : "rabbit2",
		"value" : "&#x1f407",
		"category" : "自然"
	}, {
		"name" : "dragon",
		"value" : "&#x1f409",
		"category" : "自然"
	}, {
		"name" : "racehorse",
		"value" : "&#x1f40e",
		"category" : "自然"
	}, {
		"name" : "goat",
		"value" : "&#x1f410",
		"category" : "自然"
	}, {
		"name" : "rooster",
		"value" : "&#x1f413",
		"category" : "自然"
	}, {
		"name" : "dog2",
		"value" : "&#x1f415",
		"category" : "自然"
	}, {
		"name" : "pig2",
		"value" : "&#x1f416",
		"category" : "自然"
	}, {
		"name" : "mouse2",
		"value" : "&#x1f401",
		"category" : "自然"
	}, {
		"name" : "ox",
		"value" : "&#x1f402",
		"category" : "自然"
	}, {
		"name" : "dragon-face",
		"value" : "&#x1f432",
		"category" : "自然"
	}, {
		"name" : "blowfish",
		"value" : "&#x1f421",
		"category" : "自然"
	}, {
		"name" : "crocodile",
		"value" : "&#x1f40a",
		"category" : "自然"
	}, {
		"name" : "camel",
		"value" : "&#x1f42b",
		"category" : "自然"
	}, {
		"name" : "dromedary-camel",
		"value" : "&#x1f42a",
		"category" : "自然"
	}, {
		"name" : "leopard",
		"value" : "&#x1f406",
		"category" : "自然"
	}, {
		"name" : "cat2",
		"value" : "&#x1f408",
		"category" : "自然"
	}, {
		"name" : "poodle",
		"value" : "&#x1f429",
		"category" : "自然"
	}, {
		"name" : "paw-prints",
		"value" : "&#x1f43e",
		"category" : "自然"
	}, {
		"name" : "bouquet",
		"value" : "&#x1f490",
		"category" : "自然"
	}, {
		"name" : "cherry-blossom",
		"value" : "&#x1f338",
		"category" : "自然"
	}, {
		"name" : "tulip",
		"value" : "&#x1f337",
		"category" : "自然"
	}, {
		"name" : "four-leaf-clover",
		"value" : "&#x1f340",
		"category" : "自然"
	}, {
		"name" : "rose",
		"value" : "&#x1f339",
		"category" : "自然"
	}, {
		"name" : "sunflower",
		"value" : "&#x1f33b",
		"category" : "自然"
	}, {
		"name" : "hibiscus",
		"value" : "&#x1f33a",
		"category" : "自然"
	}, {
		"name" : "maple-leaf",
		"value" : "&#x1f341",
		"category" : "自然"
	}, {
		"name" : "leaves",
		"value" : "&#x1f343",
		"category" : "自然"
	}, {
		"name" : "fallen-leaf",
		"value" : "&#x1f342",
		"category" : "自然"
	}, {
		"name" : "herb",
		"value" : "&#x1f33f",
		"category" : "自然"
	}, {
		"name" : "ear-of-rice",
		"value" : "&#x1f33e",
		"category" : "自然"
	}, {
		"name" : "mushroom",
		"value" : "&#x1f344",
		"category" : "自然"
	}, {
		"name" : "cactus",
		"value" : "&#x1f335",
		"category" : "自然"
	}, {
		"name" : "palm-tree",
		"value" : "&#x1f334",
		"category" : "自然"
	}, {
		"name" : "evergreen-tree",
		"value" : "&#x1f332",
		"category" : "自然"
	}, {
		"name" : "deciduous-tree",
		"value" : "&#x1f333",
		"category" : "自然"
	}, {
		"name" : "chestnut",
		"value" : "&#x1f330",
		"category" : "自然"
	}, {
		"name" : "seedling",
		"value" : "&#x1f331",
		"category" : "自然"
	}, {
		"name" : "blossom",
		"value" : "&#x1f33c",
		"category" : "自然"
	}, {
		"name" : "globe-with-meridians",
		"value" : "&#x1f310",
		"category" : "自然"
	}, {
		"name" : "sun-with-face",
		"value" : "&#x1f31e",
		"category" : "自然"
	}, {
		"name" : "full-moon-with-face",
		"value" : "&#x1f31d",
		"category" : "自然"
	}, {
		"name" : "new-moon-with-face",
		"value" : "&#x1f31a",
		"category" : "自然"
	}, {
		"name" : "new-moon",
		"value" : "&#x1f311",
		"category" : "自然"
	}, {
		"name" : "waxing-crescent-moon",
		"value" : "&#x1f312",
		"category" : "自然"
	}, {
		"name" : "first-quarter-moon",
		"value" : "&#x1f313",
		"category" : "自然"
	}, {
		"name" : "waxing-gibbous-moon",
		"value" : "&#x1f314",
		"category" : "自然"
	}, {
		"name" : "full-moon",
		"value" : "&#x1f315",
		"category" : "自然"
	}, {
		"name" : "waning-gibbous-moon",
		"value" : "&#x1f316",
		"category" : "自然"
	}, {
		"name" : "last-quarter-moon",
		"value" : "&#x1f317",
		"category" : "自然"
	}, {
		"name" : "waning-crescent-moon",
		"value" : "&#x1f318",
		"category" : "自然"
	}, {
		"name" : "last-quarter-moon-with-face",
		"value" : "&#x1f31c",
		"category" : "自然"
	}, {
		"name" : "first-quarter-moon-with-face",
		"value" : "&#x1f31b",
		"category" : "自然"
	}, {
		"name" : "moon",
		"value" : "&#x1f319",
		"category" : "自然"
	}, {
		"name" : "earth-africa",
		"value" : "&#x1f30d",
		"category" : "自然"
	}, {
		"name" : "earth-americas",
		"value" : "&#x1f30e",
		"category" : "自然"
	}, {
		"name" : "earth-asia",
		"value" : "&#x1f30f",
		"category" : "自然"
	}, {
		"name" : "volcano",
		"value" : "&#x1f30b",
		"category" : "自然"
	}, {
		"name" : "milky-way",
		"value" : "&#x1f30c",
		"category" : "自然"
	}, {
		"name" : "shooting-star",
		"value" : "&#x1f320",
		"category" : "自然"
	}, {
		"name" : "star",
		"value" : "&#x2b50",
		"category" : "自然"
	}, {
		"name" : "sunny",
		"value" : "&#x2600",
		"category" : "自然"
	}, {
		"name" : "partly-sunny",
		"value" : "&#x26c5",
		"category" : "自然"
	}, {
		"name" : "cloud",
		"value" : "&#x2601",
		"category" : "自然"
	}, {
		"name" : "zap",
		"value" : "&#x26a1",
		"category" : "自然"
	}, {
		"name" : "umbrella",
		"value" : "&#x2614",
		"category" : "自然"
	}, {
		"name" : "snowflake",
		"value" : "&#x2744",
		"category" : "自然"
	}, {
		"name" : "snowman",
		"value" : "&#x26c4",
		"category" : "自然"
	}, {
		"name" : "cyclone",
		"value" : "&#x1f300",
		"category" : "自然"
	}, {
		"name" : "foggy",
		"value" : "&#x1f301",
		"category" : "自然"
	}, {
		"name" : "rainbow",
		"value" : "&#x1f308",
		"category" : "自然"
	}, {
		"name" : "ocean",
		"value" : "&#x1f30a",
		"category" : "自然"
	}, {
		"name" : "bamboo",
		"value" : "&#x1f38d",
		"category" : "物体"
	}, {
		"name" : "gift-heart",
		"value" : "&#x1f49d",
		"category" : "物体"
	}, {
		"name" : "dolls",
		"value" : "&#x1f38e",
		"category" : "物体"
	}, {
		"name" : "school-satchel",
		"value" : "&#x1f392",
		"category" : "物体"
	}, {
		"name" : "mortar-board",
		"value" : "&#x1f393",
		"category" : "物体"
	}, {
		"name" : "flags",
		"value" : "&#x1f38f",
		"category" : "物体"
	}, {
		"name" : "fireworks",
		"value" : "&#x1f386",
		"category" : "物体"
	}, {
		"name" : "sparkler",
		"value" : "&#x1f387",
		"category" : "物体"
	}, {
		"name" : "wind-chime",
		"value" : "&#x1f390",
		"category" : "物体"
	}, {
		"name" : "rice-scene",
		"value" : "&#x1f391",
		"category" : "物体"
	}, {
		"name" : "jack-o-lantern",
		"value" : "&#x1f383",
		"category" : "物体"
	}, {
		"name" : "ghost",
		"value" : "&#x1f47b",
		"category" : "物体"
	}, {
		"name" : "santa",
		"value" : "&#x1f385",
		"category" : "物体"
	}, {
		"name" : "christmas-tree",
		"value" : "&#x1f384",
		"category" : "物体"
	}, {
		"name" : "gift",
		"value" : "&#x1f381",
		"category" : "物体"
	}, {
		"name" : "tanabata-tree",
		"value" : "&#x1f38b",
		"category" : "物体"
	}, {
		"name" : "tada",
		"value" : "&#x1f389",
		"category" : "物体"
	}, {
		"name" : "confetti-ball",
		"value" : "&#x1f38a",
		"category" : "物体"
	}, {
		"name" : "balloon",
		"value" : "&#x1f388",
		"category" : "物体"
	}, {
		"name" : "crossed-flags",
		"value" : "&#x1f38c",
		"category" : "物体"
	}, {
		"name" : "crystal-ball",
		"value" : "&#x1f52e",
		"category" : "物体"
	}, {
		"name" : "movie-camera",
		"value" : "&#x1f3a5",
		"category" : "物体"
	}, {
		"name" : "camera",
		"value" : "&#x1f4f7",
		"category" : "物体"
	}, {
		"name" : "video-camera",
		"value" : "&#x1f4f9",
		"category" : "物体"
	}, {
		"name" : "vhs",
		"value" : "&#x1f4fc",
		"category" : "物体"
	}, {
		"name" : "cd",
		"value" : "&#x1f4bf",
		"category" : "物体"
	}, {
		"name" : "dvd",
		"value" : "&#x1f4c0",
		"category" : "物体"
	}, {
		"name" : "minidisc",
		"value" : "&#x1f4bd",
		"category" : "物体"
	}, {
		"name" : "floppy-disk",
		"value" : "&#x1f4be",
		"category" : "物体"
	}, {
		"name" : "computer",
		"value" : "&#x1f4bb",
		"category" : "物体"
	}, {
		"name" : "iphone",
		"value" : "&#x1f4f1",
		"category" : "物体"
	}, {
		"name" : "phone",
		"value" : "&#x260e",
		"category" : "物体"
	}, {
		"name" : "telephone-receiver",
		"value" : "&#x1f4de",
		"category" : "物体"
	}, {
		"name" : "pager",
		"value" : "&#x1f4df",
		"category" : "物体"
	}, {
		"name" : "fax",
		"value" : "&#x1f4e0",
		"category" : "物体"
	}, {
		"name" : "satellite",
		"value" : "&#x1f4e1",
		"category" : "物体"
	}, {
		"name" : "tv",
		"value" : "&#x1f4fa",
		"category" : "物体"
	}, {
		"name" : "radio",
		"value" : "&#x1f4fb",
		"category" : "物体"
	}, {
		"name" : "speaker-waves",
		"value" : "&#x1f50a",
		"category" : "物体"
	}, {
		"name" : "sound",
		"value" : "&#x1f509",
		"category" : "物体"
	}, {
		"name" : "speaker",
		"value" : "&#x1f508",
		"category" : "物体"
	}, {
		"name" : "mute",
		"value" : "&#x1f507",
		"category" : "物体"
	}, {
		"name" : "bell",
		"value" : "&#x1f514",
		"category" : "物体"
	}, {
		"name" : "no-bell",
		"value" : "&#x1f515",
		"category" : "物体"
	}, {
		"name" : "loudspeaker",
		"value" : "&#x1f4e2",
		"category" : "物体"
	}, {
		"name" : "mega",
		"value" : "&#x1f4e3",
		"category" : "物体"
	}, {
		"name" : "hourglass-flowing-sand",
		"value" : "&#x23f3",
		"category" : "物体"
	}, {
		"name" : "hourglass",
		"value" : "&#x231b",
		"category" : "物体"
	}, {
		"name" : "alarm-clock",
		"value" : "&#x23f0",
		"category" : "物体"
	}, {
		"name" : "watch",
		"value" : "&#x231a",
		"category" : "物体"
	}, {
		"name" : "unlock",
		"value" : "&#x1f513",
		"category" : "物体"
	}, {
		"name" : "lock",
		"value" : "&#x1f512",
		"category" : "物体"
	}, {
		"name" : "lock-with-ink-pen",
		"value" : "&#x1f50f",
		"category" : "物体"
	}, {
		"name" : "closed-lock-with-key",
		"value" : "&#x1f510",
		"category" : "物体"
	}, {
		"name" : "key",
		"value" : "&#x1f511",
		"category" : "物体"
	}, {
		"name" : "mag-right",
		"value" : "&#x1f50e",
		"category" : "物体"
	}, {
		"name" : "bulb",
		"value" : "&#x1f4a1",
		"category" : "物体"
	}, {
		"name" : "flashlight",
		"value" : "&#x1f526",
		"category" : "物体"
	}, {
		"name" : "high-brightness",
		"value" : "&#x1f506",
		"category" : "物体"
	}, {
		"name" : "low-brightness",
		"value" : "&#x1f505",
		"category" : "物体"
	}, {
		"name" : "electric-plug",
		"value" : "&#x1f50c",
		"category" : "物体"
	}, {
		"name" : "battery",
		"value" : "&#x1f50b",
		"category" : "物体"
	}, {
		"name" : "mag",
		"value" : "&#x1f50d",
		"category" : "物体"
	}, {
		"name" : "bathtub",
		"value" : "&#x1f6c1",
		"category" : "物体"
	}, {
		"name" : "bath",
		"value" : "&#x1f6c0",
		"category" : "物体"
	}, {
		"name" : "shower",
		"value" : "&#x1f6bf",
		"category" : "物体"
	}, {
		"name" : "toilet",
		"value" : "&#x1f6bd",
		"category" : "物体"
	}, {
		"name" : "wrench",
		"value" : "&#x1f527",
		"category" : "物体"
	}, {
		"name" : "nut-and-bolt",
		"value" : "&#x1f529",
		"category" : "物体"
	}, {
		"name" : "hammer",
		"value" : "&#x1f528",
		"category" : "物体"
	}, {
		"name" : "door",
		"value" : "&#x1f6aa",
		"category" : "物体"
	}, {
		"name" : "smoking",
		"value" : "&#x1f6ac",
		"category" : "物体"
	}, {
		"name" : "bomb",
		"value" : "&#x1f4a3",
		"category" : "物体"
	}, {
		"name" : "gun",
		"value" : "&#x1f52b",
		"category" : "物体"
	}, {
		"name" : "hocho",
		"value" : "&#x1f52a",
		"category" : "物体"
	}, {
		"name" : "pill",
		"value" : "&#x1f48a",
		"category" : "物体"
	}, {
		"name" : "syringe",
		"value" : "&#x1f489",
		"category" : "物体"
	}, {
		"name" : "moneybag",
		"value" : "&#x1f4b0",
		"category" : "物体"
	}, {
		"name" : "yen",
		"value" : "&#x1f4b4",
		"category" : "物体"
	}, {
		"name" : "dollar",
		"value" : "&#x1f4b5",
		"category" : "物体"
	}, {
		"name" : "pound",
		"value" : "&#x1f4b7",
		"category" : "物体"
	}, {
		"name" : "euro",
		"value" : "&#x1f4b6",
		"category" : "物体"
	}, {
		"name" : "credit-card",
		"value" : "&#x1f4b3",
		"category" : "物体"
	}, {
		"name" : "money-with-wings",
		"value" : "&#x1f4b8",
		"category" : "物体"
	}, {
		"name" : "calling",
		"value" : "&#x1f4f2",
		"category" : "物体"
	}, {
		"name" : "e-mail",
		"value" : "&#x1f4e7",
		"category" : "物体"
	}, {
		"name" : "inbox-tray",
		"value" : "&#x1f4e5",
		"category" : "物体"
	}, {
		"name" : "outbox-tray",
		"value" : "&#x1f4e4",
		"category" : "物体"
	}, {
		"name" : "email",
		"value" : "&#x2709",
		"category" : "物体"
	}, {
		"name" : "enveloppe",
		"value" : "&#x1f4e9",
		"category" : "物体"
	}, {
		"name" : "incoming-envelope",
		"value" : "&#x1f4e8",
		"category" : "物体"
	}, {
		"name" : "postal-horn",
		"value" : "&#x1f4ef",
		"category" : "物体"
	}, {
		"name" : "mailbox",
		"value" : "&#x1f4eb",
		"category" : "物体"
	}, {
		"name" : "mailbox-closed",
		"value" : "&#x1f4ea",
		"category" : "物体"
	}, {
		"name" : "mailbox-with-mail",
		"value" : "&#x1f4ec",
		"category" : "物体"
	}, {
		"name" : "mailbox-with-no-mail",
		"value" : "&#x1f4ed",
		"category" : "物体"
	}, {
		"name" : "postbox",
		"value" : "&#x1f4ee",
		"category" : "物体"
	}, {
		"name" : "package",
		"value" : "&#x1f4e6",
		"category" : "物体"
	}, {
		"name" : "memo",
		"value" : "&#x1f4dd",
		"category" : "物体"
	}, {
		"name" : "page-facing-up",
		"value" : "&#x1f4c4",
		"category" : "物体"
	}, {
		"name" : "page-with-curl",
		"value" : "&#x1f4c3",
		"category" : "物体"
	}, {
		"name" : "bookmark-tabs",
		"value" : "&#x1f4d1",
		"category" : "物体"
	}, {
		"name" : "bar-chart",
		"value" : "&#x1f4ca",
		"category" : "物体"
	}, {
		"name" : "chart-with-upwards-trend",
		"value" : "&#x1f4c8",
		"category" : "物体"
	}, {
		"name" : "chart-with-downwards-trend",
		"value" : "&#x1f4c9",
		"category" : "物体"
	}, {
		"name" : "scroll",
		"value" : "&#x1f4dc",
		"category" : "物体"
	}, {
		"name" : "clipboard",
		"value" : "&#x1f4cb",
		"category" : "物体"
	}, {
		"name" : "date",
		"value" : "&#x1f4c5",
		"category" : "物体"
	}, {
		"name" : "calendar",
		"value" : "&#x1f4c6",
		"category" : "物体"
	}, {
		"name" : "card-index",
		"value" : "&#x1f4c7",
		"category" : "物体"
	}, {
		"name" : "file-folder",
		"value" : "&#x1f4c1",
		"category" : "物体"
	}, {
		"name" : "open-file-folder",
		"value" : "&#x1f4c2",
		"category" : "物体"
	}, {
		"name" : "scissors",
		"value" : "&#x2702",
		"category" : "物体"
	}, {
		"name" : "pushpin",
		"value" : "&#x1f4cc",
		"category" : "物体"
	}, {
		"name" : "paperclip",
		"value" : "&#x1f4ce",
		"category" : "物体"
	}, {
		"name" : "black-nib",
		"value" : "&#x2712",
		"category" : "物体"
	}, {
		"name" : "pencil2",
		"value" : "&#x270f",
		"category" : "物体"
	}, {
		"name" : "straight-ruler",
		"value" : "&#x1f4cf",
		"category" : "物体"
	}, {
		"name" : "triangular-ruler",
		"value" : "&#x1f4d0",
		"category" : "物体"
	}, {
		"name" : "closed-book",
		"value" : "&#x1f4d5",
		"category" : "物体"
	}, {
		"name" : "green-book",
		"value" : "&#x1f4d7",
		"category" : "物体"
	}, {
		"name" : "blue-book",
		"value" : "&#x1f4d8",
		"category" : "物体"
	}, {
		"name" : "orange-book",
		"value" : "&#x1f4d9",
		"category" : "物体"
	}, {
		"name" : "notebook",
		"value" : "&#x1f4d3",
		"category" : "物体"
	}, {
		"name" : "notebook-with-decorative-cover",
		"value" : "&#x1f4d4",
		"category" : "物体"
	}, {
		"name" : "ledger",
		"value" : "&#x1f4d2",
		"category" : "物体"
	}, {
		"name" : "books",
		"value" : "&#x1f4da",
		"category" : "物体"
	}, {
		"name" : "open-book",
		"value" : "&#x1f4d6",
		"category" : "物体"
	}, {
		"name" : "bookmark",
		"value" : "&#x1f516",
		"category" : "物体"
	}, {
		"name" : "name-badge",
		"value" : "&#x1f4db",
		"category" : "物体"
	}, {
		"name" : "microscope",
		"value" : "&#x1f52c",
		"category" : "物体"
	}, {
		"name" : "telescope",
		"value" : "&#x1f52d",
		"category" : "物体"
	}, {
		"name" : "newspaper",
		"value" : "&#x1f4f0",
		"category" : "物体"
	}, {
		"name" : "art",
		"value" : "&#x1f3a8",
		"category" : "物体"
	}, {
		"name" : "clapper",
		"value" : "&#x1f3ac",
		"category" : "物体"
	}, {
		"name" : "microphone",
		"value" : "&#x1f3a4",
		"category" : "物体"
	}, {
		"name" : "headphones",
		"value" : "&#x1f3a7",
		"category" : "物体"
	}, {
		"name" : "musical-score",
		"value" : "&#x1f3bc",
		"category" : "物体"
	}, {
		"name" : "musical-note",
		"value" : "&#x1f3b5",
		"category" : "物体"
	}, {
		"name" : "notes",
		"value" : "&#x1f3b6",
		"category" : "物体"
	}, {
		"name" : "musical-keyboard",
		"value" : "&#x1f3b9",
		"category" : "物体"
	}, {
		"name" : "violin",
		"value" : "&#x1f3bb",
		"category" : "物体"
	}, {
		"name" : "trumpet",
		"value" : "&#x1f3ba",
		"category" : "物体"
	}, {
		"name" : "saxophone",
		"value" : "&#x1f3b7",
		"category" : "物体"
	}, {
		"name" : "guitar",
		"value" : "&#x1f3b8",
		"category" : "物体"
	}, {
		"name" : "space-invader",
		"value" : "&#x1f47e",
		"category" : "物体"
	}, {
		"name" : "video-game",
		"value" : "&#x1f3ae",
		"category" : "物体"
	}, {
		"name" : "black-joker",
		"value" : "&#x1f0cf",
		"category" : "物体"
	}, {
		"name" : "flower-playing-cards",
		"value" : "&#x1f3b4",
		"category" : "物体"
	}, {
		"name" : "mahjong",
		"value" : "&#x1f004",
		"category" : "物体"
	}, {
		"name" : "game-die",
		"value" : "&#x1f3b2",
		"category" : "物体"
	}, {
		"name" : "dart",
		"value" : "&#x1f3af",
		"category" : "物体"
	}, {
		"name" : "football",
		"value" : "&#x1f3c8",
		"category" : "物体"
	}, {
		"name" : "basketball",
		"value" : "&#x1f3c0",
		"category" : "物体"
	}, {
		"name" : "soccer",
		"value" : "&#x26bd",
		"category" : "物体"
	}, {
		"name" : "baseball",
		"value" : "&#x26be",
		"category" : "物体"
	}, {
		"name" : "tennis",
		"value" : "&#x1f3be",
		"category" : "物体"
	}, {
		"name" : "8ball",
		"value" : "&#x1f3b1",
		"category" : "物体"
	}, {
		"name" : "rugby-football",
		"value" : "&#x1f3c9",
		"category" : "物体"
	}, {
		"name" : "bowling",
		"value" : "&#x1f3b3",
		"category" : "物体"
	}, {
		"name" : "golf",
		"value" : "&#x26f3",
		"category" : "物体"
	}, {
		"name" : "mountain-bicyclist",
		"value" : "&#x1f6b5",
		"category" : "物体"
	}, {
		"name" : "bicyclist",
		"value" : "&#x1f6b4",
		"category" : "物体"
	}, {
		"name" : "checkered-flag",
		"value" : "&#x1f3c1",
		"category" : "物体"
	}, {
		"name" : "horse-racing",
		"value" : "&#x1f3c7",
		"category" : "物体"
	}, {
		"name" : "trophy",
		"value" : "&#x1f3c6",
		"category" : "物体"
	}, {
		"name" : "ski",
		"value" : "&#x1f3bf",
		"category" : "物体"
	}, {
		"name" : "snowboarder",
		"value" : "&#x1f3c2",
		"category" : "物体"
	}, {
		"name" : "swimmer",
		"value" : "&#x1f3ca",
		"category" : "物体"
	}, {
		"name" : "surfer",
		"value" : "&#x1f3c4",
		"category" : "物体"
	}, {
		"name" : "fishing-pole-and-fish",
		"value" : "&#x1f3a3",
		"category" : "物体"
	}, {
		"name" : "coffee",
		"value" : "&#x2615",
		"category" : "物体"
	}, {
		"name" : "tea",
		"value" : "&#x1f375",
		"category" : "物体"
	}, {
		"name" : "sake",
		"value" : "&#x1f376",
		"category" : "物体"
	}, {
		"name" : "baby-bottle",
		"value" : "&#x1f37c",
		"category" : "物体"
	}, {
		"name" : "beer",
		"value" : "&#x1f37a",
		"category" : "物体"
	}, {
		"name" : "beers",
		"value" : "&#x1f37b",
		"category" : "物体"
	}, {
		"name" : "cocktail",
		"value" : "&#x1f378",
		"category" : "物体"
	}, {
		"name" : "tropical-drink",
		"value" : "&#x1f379",
		"category" : "物体"
	}, {
		"name" : "wine-glass",
		"value" : "&#x1f377",
		"category" : "物体"
	}, {
		"name" : "fork-and-knife",
		"value" : "&#x1f374",
		"category" : "物体"
	}, {
		"name" : "pizza",
		"value" : "&#x1f355",
		"category" : "物体"
	}, {
		"name" : "hamburger",
		"value" : "&#x1f354",
		"category" : "物体"
	}, {
		"name" : "fries",
		"value" : "&#x1f35f",
		"category" : "物体"
	}, {
		"name" : "poultry-leg",
		"value" : "&#x1f357",
		"category" : "物体"
	}, {
		"name" : "meat-on-bone",
		"value" : "&#x1f356",
		"category" : "物体"
	}, {
		"name" : "spaghetti",
		"value" : "&#x1f35d",
		"category" : "物体"
	}, {
		"name" : "curry",
		"value" : "&#x1f35b",
		"category" : "物体"
	}, {
		"name" : "fried-shrimp",
		"value" : "&#x1f364",
		"category" : "物体"
	}, {
		"name" : "bento",
		"value" : "&#x1f371",
		"category" : "物体"
	}, {
		"name" : "sushi",
		"value" : "&#x1f363",
		"category" : "物体"
	}, {
		"name" : "fish-cake",
		"value" : "&#x1f365",
		"category" : "物体"
	}, {
		"name" : "rice-ball",
		"value" : "&#x1f359",
		"category" : "物体"
	}, {
		"name" : "rice-cracker",
		"value" : "&#x1f358",
		"category" : "物体"
	}, {
		"name" : "rice",
		"value" : "&#x1f35a",
		"category" : "物体"
	}, {
		"name" : "ramen",
		"value" : "&#x1f35c",
		"category" : "物体"
	}, {
		"name" : "stew",
		"value" : "&#x1f372",
		"category" : "物体"
	}, {
		"name" : "oden",
		"value" : "&#x1f362",
		"category" : "物体"
	}, {
		"name" : "dango",
		"value" : "&#x1f361",
		"category" : "物体"
	}, {
		"name" : "egg",
		"value" : "&#x1f373",
		"category" : "物体"
	}, {
		"name" : "bread",
		"value" : "&#x1f35e",
		"category" : "物体"
	}, {
		"name" : "doughnut",
		"value" : "&#x1f369",
		"category" : "物体"
	}, {
		"name" : "custard",
		"value" : "&#x1f36e",
		"category" : "物体"
	}, {
		"name" : "icecream",
		"value" : "&#x1f366",
		"category" : "物体"
	}, {
		"name" : "ice-cream",
		"value" : "&#x1f368",
		"category" : "物体"
	}, {
		"name" : "shaved-ice",
		"value" : "&#x1f367",
		"category" : "物体"
	}, {
		"name" : "birthday",
		"value" : "&#x1f382",
		"category" : "物体"
	}, {
		"name" : "cake",
		"value" : "&#x1f370",
		"category" : "物体"
	}, {
		"name" : "cookie",
		"value" : "&#x1f36a",
		"category" : "物体"
	}, {
		"name" : "chocolate-bar",
		"value" : "&#x1f36b",
		"category" : "物体"
	}, {
		"name" : "candy",
		"value" : "&#x1f36c",
		"category" : "物体"
	}, {
		"name" : "lollipop",
		"value" : "&#x1f36d",
		"category" : "物体"
	}, {
		"name" : "honey-pot",
		"value" : "&#x1f36f",
		"category" : "物体"
	}, {
		"name" : "apple",
		"value" : "&#x1f34e",
		"category" : "物体"
	}, {
		"name" : "green-apple",
		"value" : "&#x1f34f",
		"category" : "物体"
	}, {
		"name" : "tangerine",
		"value" : "&#x1f34a",
		"category" : "物体"
	}, {
		"name" : "lemon",
		"value" : "&#x1f34b",
		"category" : "物体"
	}, {
		"name" : "cherries",
		"value" : "&#x1f352",
		"category" : "物体"
	}, {
		"name" : "grapes",
		"value" : "&#x1f347",
		"category" : "物体"
	}, {
		"name" : "watermelon",
		"value" : "&#x1f349",
		"category" : "物体"
	}, {
		"name" : "strawberry",
		"value" : "&#x1f353",
		"category" : "物体"
	}, {
		"name" : "peach",
		"value" : "&#x1f351",
		"category" : "物体"
	}, {
		"name" : "melon",
		"value" : "&#x1f348",
		"category" : "物体"
	}, {
		"name" : "banana",
		"value" : "&#x1f34c",
		"category" : "物体"
	}, {
		"name" : "pear",
		"value" : "&#x1f350",
		"category" : "物体"
	}, {
		"name" : "pineapple",
		"value" : "&#x1f34d",
		"category" : "物体"
	}, {
		"name" : "sweet-potato",
		"value" : "&#x1f360",
		"category" : "物体"
	}, {
		"name" : "eggplant",
		"value" : "&#x1f346",
		"category" : "物体"
	}, {
		"name" : "tomato",
		"value" : "&#x1f345",
		"category" : "物体"
	}, {
		"name" : "corn",
		"value" : "&#x1f33d",
		"category" : "物体"
	}, {
		"name" : "house",
		"value" : "&#x1f3e0",
		"category" : "地点"
	}, {
		"name" : "house-with-garden",
		"value" : "&#x1f3e1",
		"category" : "地点"
	}, {
		"name" : "school",
		"value" : "&#x1f3eb",
		"category" : "地点"
	}, {
		"name" : "office",
		"value" : "&#x1f3e2",
		"category" : "地点"
	}, {
		"name" : "post-office",
		"value" : "&#x1f3e3",
		"category" : "地点"
	}, {
		"name" : "hospital",
		"value" : "&#x1f3e5",
		"category" : "地点"
	}, {
		"name" : "bank",
		"value" : "&#x1f3e6",
		"category" : "地点"
	}, {
		"name" : "convenience-store",
		"value" : "&#x1f3ea",
		"category" : "地点"
	}, {
		"name" : "love-hotel",
		"value" : "&#x1f3e9",
		"category" : "地点"
	}, {
		"name" : "hotel",
		"value" : "&#x1f3e8",
		"category" : "地点"
	}, {
		"name" : "wedding",
		"value" : "&#x1f492",
		"category" : "地点"
	}, {
		"name" : "church",
		"value" : "&#x26ea",
		"category" : "地点"
	}, {
		"name" : "department-store",
		"value" : "&#x1f3ec",
		"category" : "地点"
	}, {
		"name" : "european-post-office",
		"value" : "&#x1f3e4",
		"category" : "地点"
	}, {
		"name" : "private-use",
		"value" : "&#xe50a",
		"category" : "地点"
	}, {
		"name" : "city-sunrise",
		"value" : "&#x1f307",
		"category" : "地点"
	}, {
		"name" : "city-sunset",
		"value" : "&#x1f306",
		"category" : "地点"
	}, {
		"name" : "japanese-castle",
		"value" : "&#x1f3ef",
		"category" : "地点"
	}, {
		"name" : "european-castle",
		"value" : "&#x1f3f0",
		"category" : "地点"
	}, {
		"name" : "tent",
		"value" : "&#x26fa",
		"category" : "地点"
	}, {
		"name" : "factory",
		"value" : "&#x1f3ed",
		"category" : "地点"
	}, {
		"name" : "tokyo-tower",
		"value" : "&#x1f5fc",
		"category" : "地点"
	}, {
		"name" : "japan",
		"value" : "&#x1f5fe",
		"category" : "地点"
	}, {
		"name" : "mount-fuji",
		"value" : "&#x1f5fb",
		"category" : "地点"
	}, {
		"name" : "sunrise-over-mountains",
		"value" : "&#x1f304",
		"category" : "地点"
	}, {
		"name" : "sunrise",
		"value" : "&#x1f305",
		"category" : "地点"
	}, {
		"name" : "stars",
		"value" : "&#x1f303",
		"category" : "地点"
	}, {
		"name" : "statue-of-liberty",
		"value" : "&#x1f5fd",
		"category" : "地点"
	}, {
		"name" : "bridge-at-night",
		"value" : "&#x1f309",
		"category" : "地点"
	}, {
		"name" : "carousel-horse",
		"value" : "&#x1f3a0",
		"category" : "地点"
	}, {
		"name" : "ferris-wheel",
		"value" : "&#x1f3a1",
		"category" : "地点"
	}, {
		"name" : "fountain",
		"value" : "&#x26f2",
		"category" : "地点"
	}, {
		"name" : "roller-coaster",
		"value" : "&#x1f3a2",
		"category" : "地点"
	}, {
		"name" : "ship",
		"value" : "&#x1f6a2",
		"category" : "地点"
	}, {
		"name" : "boat",
		"value" : "&#x26f5",
		"category" : "地点"
	}, {
		"name" : "speedboat",
		"value" : "&#x1f6a4",
		"category" : "地点"
	}, {
		"name" : "rowboat",
		"value" : "&#x1f6a3",
		"category" : "地点"
	}, {
		"name" : "anchor",
		"value" : "&#x2693",
		"category" : "地点"
	}, {
		"name" : "rocket",
		"value" : "&#x1f680",
		"category" : "地点"
	}, {
		"name" : "airplane",
		"value" : "&#x2708",
		"category" : "地点"
	}, {
		"name" : "seat",
		"value" : "&#x1f4ba",
		"category" : "地点"
	}, {
		"name" : "helicopter",
		"value" : "&#x1f681",
		"category" : "地点"
	}, {
		"name" : "steam-locomotive",
		"value" : "&#x1f682",
		"category" : "地点"
	}, {
		"name" : "tram",
		"value" : "&#x1f68a",
		"category" : "地点"
	}, {
		"name" : "station",
		"value" : "&#x1f689",
		"category" : "地点"
	}, {
		"name" : "mountain-railway",
		"value" : "&#x1f69e",
		"category" : "地点"
	}, {
		"name" : "train2",
		"value" : "&#x1f686",
		"category" : "地点"
	}, {
		"name" : "bullettrain-side",
		"value" : "&#x1f684",
		"category" : "地点"
	}, {
		"name" : "bullettrain-front",
		"value" : "&#x1f685",
		"category" : "地点"
	}, {
		"name" : "light-rail",
		"value" : "&#x1f688",
		"category" : "地点"
	}, {
		"name" : "metro",
		"value" : "&#x1f687",
		"category" : "地点"
	}, {
		"name" : "monorail",
		"value" : "&#x1f69d",
		"category" : "地点"
	}, {
		"name" : "tram-car",
		"value" : "&#x1f68b",
		"category" : "地点"
	}, {
		"name" : "railway-car",
		"value" : "&#x1f683",
		"category" : "地点"
	}, {
		"name" : "trolleybus",
		"value" : "&#x1f68e",
		"category" : "地点"
	}, {
		"name" : "bus",
		"value" : "&#x1f68c",
		"category" : "地点"
	}, {
		"name" : "oncoming-bus",
		"value" : "&#x1f68d",
		"category" : "地点"
	}, {
		"name" : "blue-car",
		"value" : "&#x1f699",
		"category" : "地点"
	}, {
		"name" : "oncoming-automobile",
		"value" : "&#x1f698",
		"category" : "地点"
	}, {
		"name" : "car",
		"value" : "&#x1f697",
		"category" : "地点"
	}, {
		"name" : "taxi",
		"value" : "&#x1f695",
		"category" : "地点"
	}, {
		"name" : "oncoming-taxi",
		"value" : "&#x1f696",
		"category" : "地点"
	}, {
		"name" : "articulated-lorry",
		"value" : "&#x1f69b",
		"category" : "地点"
	}, {
		"name" : "truck",
		"value" : "&#x1f69a",
		"category" : "地点"
	}, {
		"name" : "rotating-light",
		"value" : "&#x1f6a8",
		"category" : "地点"
	}, {
		"name" : "police-car",
		"value" : "&#x1f693",
		"category" : "地点"
	}, {
		"name" : "oncoming-police-car",
		"value" : "&#x1f694",
		"category" : "地点"
	}, {
		"name" : "fire-engine",
		"value" : "&#x1f692",
		"category" : "地点"
	}, {
		"name" : "ambulance",
		"value" : "&#x1f691",
		"category" : "地点"
	}, {
		"name" : "minibus",
		"value" : "&#x1f690",
		"category" : "地点"
	}, {
		"name" : "bike",
		"value" : "&#x1f6b2",
		"category" : "地点"
	}, {
		"name" : "aerial-tramway",
		"value" : "&#x1f6a1",
		"category" : "地点"
	}, {
		"name" : "suspension-railway",
		"value" : "&#x1f69f",
		"category" : "地点"
	}, {
		"name" : "mountain-cableway",
		"value" : "&#x1f6a0",
		"category" : "地点"
	}, {
		"name" : "tractor",
		"value" : "&#x1f69c",
		"category" : "地点"
	}, {
		"name" : "barber",
		"value" : "&#x1f488",
		"category" : "地点"
	}, {
		"name" : "busstop",
		"value" : "&#x1f68f",
		"category" : "地点"
	}, {
		"name" : "ticket",
		"value" : "&#x1f3ab",
		"category" : "地点"
	}, {
		"name" : "vertical-traffic-light",
		"value" : "&#x1f6a6",
		"category" : "地点"
	}, {
		"name" : "traffic-light",
		"value" : "&#x1f6a5",
		"category" : "地点"
	}, {
		"name" : "warning",
		"value" : "&#x26a0",
		"category" : "地点"
	}, {
		"name" : "construction",
		"value" : "&#x1f6a7",
		"category" : "地点"
	}, {
		"name" : "beginner",
		"value" : "&#x1f530",
		"category" : "地点"
	}, {
		"name" : "fuelpump",
		"value" : "&#x26fd",
		"category" : "地点"
	}, {
		"name" : "izakaya-lantern",
		"value" : "&#x1f3ee",
		"category" : "地点"
	}, {
		"name" : "slot-machine",
		"value" : "&#x1f3b0",
		"category" : "地点"
	}, {
		"name" : "hotsprings",
		"value" : "&#x2668",
		"category" : "地点"
	}, {
		"name" : "moyai",
		"value" : "&#x1f5ff",
		"category" : "地点"
	}, {
		"name" : "circus-tent",
		"value" : "&#x1f3aa",
		"category" : "地点"
	}, {
		"name" : "performing-arts",
		"value" : "&#x1f3ad",
		"category" : "地点"
	}, {
		"name" : "round-pushpin",
		"value" : "&#x1f4cd",
		"category" : "地点"
	}, {
		"name" : "triangular-flag-on-post",
		"value" : "&#x1f6a9",
		"category" : "地点"
	}, {
		"name" : "cn",
		"value" : "&#x1f1e8;&#x1f1f3",
		"category" : "地点"
	}, {
		"name" : "de",
		"value" : "&#x1f1e9;&#x1f1ea",
		"category" : "地点"
	}, {
		"name" : "es",
		"value" : "&#x1f1ea;&#x1f1f8",
		"category" : "地点"
	}, {
		"name" : "fr",
		"value" : "&#x1f1eb;&#x1f1f7",
		"category" : "地点"
	}, {
		"name" : "gb",
		"value" : "&#x1f1ec;&#x1f1e7",
		"category" : "地点"
	}, {
		"name" : "it",
		"value" : "&#x1f1ee;&#x1f1f9",
		"category" : "地点"
	}, {
		"name" : "jp",
		"value" : "&#x1f1ef;&#x1f1f5",
		"category" : "地点"
	}, {
		"name" : "kr",
		"value" : "&#x1f1f0;&#x1f1f7",
		"category" : "地点"
	}, {
		"name" : "ru",
		"value" : "&#x1f1f7;&#x1f1fa",
		"category" : "地点"
	}, {
		"name" : "us",
		"value" : "&#x1f1fa;&#x1f1f8",
		"category" : "地点"
	}, {
		"name" : "one",
		"value" : "&#x31;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "two",
		"value" : "&#x32;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "three",
		"value" : "&#x33;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "four",
		"value" : "&#x34;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "five",
		"value" : "&#x35;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "six",
		"value" : "&#x36;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "seve",
		"value" : "&#x37;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "eight",
		"value" : "&#x38;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "nine",
		"value" : "&#x39;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "zero",
		"value" : "&#x30;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "keycap-ten",
		"value" : "&#x1f51f",
		"category" : "符号"
	}, {
		"name" : "1234",
		"value" : "&#x1f522",
		"category" : "符号"
	}, {
		"name" : "hash",
		"value" : "&#x23;&#x20e3",
		"category" : "符号"
	}, {
		"name" : "符号s",
		"value" : "&#x1f523",
		"category" : "符号"
	}, {
		"name" : "capital-abcd",
		"value" : "&#x1f520",
		"category" : "符号"
	}, {
		"name" : "abcd",
		"value" : "&#x1f521",
		"category" : "符号"
	}, {
		"name" : "abc",
		"value" : "&#x1f524",
		"category" : "符号"
	}, {
		"name" : "letter-a",
		"value" : "&#x1f1e6",
		"category" : "符号"
	}, {
		"name" : "letter-b",
		"value" : "&#x1f1e7",
		"category" : "符号"
	}, {
		"name" : "letter-c",
		"value" : "&#x1f1e8",
		"category" : "符号"
	}, {
		"name" : "letter-d",
		"value" : "&#x1f1e9",
		"category" : "符号"
	}, {
		"name" : "letter-e",
		"value" : "&#x1f1ea",
		"category" : "符号"
	}, {
		"name" : "letter-f",
		"value" : "&#x1f1eb",
		"category" : "符号"
	}, {
		"name" : "letter-g",
		"value" : "&#x1f1ec",
		"category" : "符号"
	}, {
		"name" : "letter-h",
		"value" : "&#x1f1ed",
		"category" : "符号"
	}, {
		"name" : "letter-i",
		"value" : "&#x1f1ee",
		"category" : "符号"
	}, {
		"name" : "letter-j",
		"value" : "&#x1f1ef",
		"category" : "符号"
	}, {
		"name" : "letter-k",
		"value" : "&#x1f1f0",
		"category" : "符号"
	}, {
		"name" : "letter-l",
		"value" : "&#x1f1f1",
		"category" : "符号"
	}, {
		"name" : "letter-m",
		"value" : "&#x1f1f2",
		"category" : "符号"
	}, {
		"name" : "letter-n",
		"value" : "&#x1f1f3",
		"category" : "符号"
	}, {
		"name" : "letter-o",
		"value" : "&#x1f1f4",
		"category" : "符号"
	}, {
		"name" : "letter-p",
		"value" : "&#x1f1f5",
		"category" : "符号"
	}, {
		"name" : "letter-q",
		"value" : "&#x1f1f6",
		"category" : "符号"
	}, {
		"name" : "letter-r",
		"value" : "&#x1f1f7",
		"category" : "符号"
	}, {
		"name" : "letter-s",
		"value" : "&#x1f1f8",
		"category" : "符号"
	}, {
		"name" : "letter-t",
		"value" : "&#x1f1f9",
		"category" : "符号"
	}, {
		"name" : "letter-u",
		"value" : "&#x1f1fa",
		"category" : "符号"
	}, {
		"name" : "letter-v",
		"value" : "&#x1f1fb",
		"category" : "符号"
	}, {
		"name" : "letter-w",
		"value" : "&#x1f1fc",
		"category" : "符号"
	}, {
		"name" : "letter-x",
		"value" : "&#x1f1fd",
		"category" : "符号"
	}, {
		"name" : "letter-y",
		"value" : "&#x1f1fe",
		"category" : "符号"
	}, {
		"name" : "letter-z",
		"value" : "&#x1f1ff",
		"category" : "符号"
	}, {
		"name" : "arrow-up",
		"value" : "&#x2b06",
		"category" : "符号"
	}, {
		"name" : "arrow-down",
		"value" : "&#x2b07",
		"category" : "符号"
	}, {
		"name" : "arrow-left",
		"value" : "&#x2b05",
		"category" : "符号"
	}, {
		"name" : "arrow-right",
		"value" : "&#x27a1",
		"category" : "符号"
	}, {
		"name" : "arrow-upper-left",
		"value" : "&#x2196",
		"category" : "符号"
	}, {
		"name" : "arrow-upper-right",
		"value" : "&#x2197",
		"category" : "符号"
	}, {
		"name" : "arrow-lower-right",
		"value" : "&#x2198",
		"category" : "符号"
	}, {
		"name" : "arrow-lower-left",
		"value" : "&#x2199",
		"category" : "符号"
	}, {
		"name" : "left-right-arrow",
		"value" : "&#x2194",
		"category" : "符号"
	}, {
		"name" : "arrow-up-down",
		"value" : "&#x2195",
		"category" : "符号"
	}, {
		"name" : "arrows-counterclockwise",
		"value" : "&#x1f504",
		"category" : "符号"
	}, {
		"name" : "arrow-backward",
		"value" : "&#x25c0",
		"category" : "符号"
	}, {
		"name" : "arrow-forward",
		"value" : "&#x25b6",
		"category" : "符号"
	}, {
		"name" : "arrow-up-small",
		"value" : "&#x1f53c",
		"category" : "符号"
	}, {
		"name" : "arrow-down-small",
		"value" : "&#x1f53d",
		"category" : "符号"
	}, {
		"name" : "leftwards-arrow-with-hook",
		"value" : "&#x21a9",
		"category" : "符号"
	}, {
		"name" : "arrow-right-hook",
		"value" : "&#x21aa",
		"category" : "符号"
	}, {
		"name" : "information-source",
		"value" : "&#x2139",
		"category" : "符号"
	}, {
		"name" : "rewind",
		"value" : "&#x23ea",
		"category" : "符号"
	}, {
		"name" : "fast-forward",
		"value" : "&#x23e9",
		"category" : "符号"
	}, {
		"name" : "arrow-double-up",
		"value" : "&#x23eb",
		"category" : "符号"
	}, {
		"name" : "arrow-double-down",
		"value" : "&#x23ec",
		"category" : "符号"
	}, {
		"name" : "arrow-heading-down",
		"value" : "&#x2935",
		"category" : "符号"
	}, {
		"name" : "arrow-heading-up",
		"value" : "&#x2934",
		"category" : "符号"
	}, {
		"name" : "ok",
		"value" : "&#x1f197",
		"category" : "符号"
	}, {
		"name" : "twisted-rightwards-arrows",
		"value" : "&#x1f500",
		"category" : "符号"
	}, {
		"name" : "repeat",
		"value" : "&#x1f501",
		"category" : "符号"
	}, {
		"name" : "repeat-one",
		"value" : "&#x1f502",
		"category" : "符号"
	}, {
		"name" : "new",
		"value" : "&#x1f195",
		"category" : "符号"
	}, {
		"name" : "up",
		"value" : "&#x1f199",
		"category" : "符号"
	}, {
		"name" : "cool",
		"value" : "&#x1f192",
		"category" : "符号"
	}, {
		"name" : "free",
		"value" : "&#x1f193",
		"category" : "符号"
	}, {
		"name" : "ng",
		"value" : "&#x1f196",
		"category" : "符号"
	}, {
		"name" : "signal-strength",
		"value" : "&#x1f4f6",
		"category" : "符号"
	}, {
		"name" : "cinema",
		"value" : "&#x1f3a6",
		"category" : "符号"
	}, {
		"name" : "koko",
		"value" : "&#x1f201",
		"category" : "符号"
	}, {
		"name" : "u6307",
		"value" : "&#x1f22f",
		"category" : "符号"
	}, {
		"name" : "u7a7a",
		"value" : "&#x1f233",
		"category" : "符号"
	}, {
		"name" : "u6e80",
		"value" : "&#x1f235",
		"category" : "符号"
	}, {
		"name" : "u5408",
		"value" : "&#x1f234",
		"category" : "符号"
	}, {
		"name" : "u7981",
		"value" : "&#x1f232",
		"category" : "符号"
	}, {
		"name" : "ideograph-advantage",
		"value" : "&#x1f250",
		"category" : "符号"
	}, {
		"name" : "u5272",
		"value" : "&#x1f239",
		"category" : "符号"
	}, {
		"name" : "u55b6",
		"value" : "&#x1f23a",
		"category" : "符号"
	}, {
		"name" : "u6709",
		"value" : "&#x1f236",
		"category" : "符号"
	}, {
		"name" : "u7121",
		"value" : "&#x1f21a",
		"category" : "符号"
	}, {
		"name" : "restroom",
		"value" : "&#x1f6bb",
		"category" : "符号"
	}, {
		"name" : "mens",
		"value" : "&#x1f6b9",
		"category" : "符号"
	}, {
		"name" : "womens",
		"value" : "&#x1f6ba",
		"category" : "符号"
	}, {
		"name" : "baby-符号",
		"value" : "&#x1f6bc",
		"category" : "符号"
	}, {
		"name" : "wc",
		"value" : "&#x1f6be",
		"category" : "符号"
	}, {
		"name" : "potable-water",
		"value" : "&#x1f6b0",
		"category" : "符号"
	}, {
		"name" : "put-litter-in-its-place",
		"value" : "&#x1f6ae",
		"category" : "符号"
	}, {
		"name" : "parking",
		"value" : "&#x1f17f",
		"category" : "符号"
	}, {
		"name" : "wheelchair",
		"value" : "&#x267f",
		"category" : "符号"
	}, {
		"name" : "no-smoking",
		"value" : "&#x1f6ad",
		"category" : "符号"
	}, {
		"name" : "u6708",
		"value" : "&#x1f237",
		"category" : "符号"
	}, {
		"name" : "u7533",
		"value" : "&#x1f238",
		"category" : "符号"
	}, {
		"name" : "sa",
		"value" : "&#x1f202",
		"category" : "符号"
	}, {
		"name" : "m",
		"value" : "&#x24c2",
		"category" : "符号"
	}, {
		"name" : "passport-control",
		"value" : "&#x1f6c2",
		"category" : "符号"
	}, {
		"name" : "baggage-claim",
		"value" : "&#x1f6c4",
		"category" : "符号"
	}, {
		"name" : "left-luggage",
		"value" : "&#x1f6c5",
		"category" : "符号"
	}, {
		"name" : "customs",
		"value" : "&#x1f6c3",
		"category" : "符号"
	}, {
		"name" : "accept",
		"value" : "&#x1f251",
		"category" : "符号"
	}, {
		"name" : "secret",
		"value" : "&#x3299",
		"category" : "符号"
	}, {
		"name" : "congratulations",
		"value" : "&#x3297",
		"category" : "符号"
	}, {
		"name" : "cl",
		"value" : "&#x1f191",
		"category" : "符号"
	}, {
		"name" : "sos",
		"value" : "&#x1f198",
		"category" : "符号"
	}, {
		"name" : "id",
		"value" : "&#x1f194",
		"category" : "符号"
	}, {
		"name" : "no-entry-sign",
		"value" : "&#x1f6ab",
		"category" : "符号"
	}, {
		"name" : "underage",
		"value" : "&#x1f51e",
		"category" : "符号"
	}, {
		"name" : "no-mobile-phones",
		"value" : "&#x1f4f5",
		"category" : "符号"
	}, {
		"name" : "do-not-litter",
		"value" : "&#x1f6af",
		"category" : "符号"
	}, {
		"name" : "non-potable-water",
		"value" : "&#x1f6b1",
		"category" : "符号"
	}, {
		"name" : "no-bicycles",
		"value" : "&#x1f6b3",
		"category" : "符号"
	}, {
		"name" : "no-pedestrians",
		"value" : "&#x1f6b7",
		"category" : "符号"
	}, {
		"name" : "children-crossing",
		"value" : "&#x1f6b8",
		"category" : "符号"
	}, {
		"name" : "no-entry",
		"value" : "&#x26d4",
		"category" : "符号"
	}, {
		"name" : "eight-spoked-asterisk",
		"value" : "&#x2733",
		"category" : "符号"
	}, {
		"name" : "table-lamp",
		"value" : "&#x2747",
		"category" : "符号"
	}, {
		"name" : "negative-squared-cross-mark",
		"value" : "&#x274e",
		"category" : "符号"
	}, {
		"name" : "white-check-mark",
		"value" : "&#x2705",
		"category" : "符号"
	}, {
		"name" : "eight-pointed-black-star",
		"value" : "&#x2734",
		"category" : "符号"
	}, {
		"name" : "heart-decoration",
		"value" : "&#x1f49f",
		"category" : "符号"
	}, {
		"name" : "vs",
		"value" : "&#x1f19a",
		"category" : "符号"
	}, {
		"name" : "vibration-mode",
		"value" : "&#x1f4f3",
		"category" : "符号"
	}, {
		"name" : "mobile-phone-off",
		"value" : "&#x1f4f4",
		"category" : "符号"
	}, {
		"name" : "a",
		"value" : "&#x1f170",
		"category" : "符号"
	}, {
		"name" : "b",
		"value" : "&#x1f171",
		"category" : "符号"
	}, {
		"name" : "ab",
		"value" : "&#x1f18e",
		"category" : "符号"
	}, {
		"name" : "o2",
		"value" : "&#x1f17e",
		"category" : "符号"
	}, {
		"name" : "diamond-shape-with-a-dot-inside",
		"value" : "&#x1f4a0",
		"category" : "符号"
	}, {
		"name" : "loop",
		"value" : "&#x27bf",
		"category" : "符号"
	}, {
		"name" : "recycle",
		"value" : "&#x267b",
		"category" : "符号"
	}, {
		"name" : "aries",
		"value" : "&#x2648",
		"category" : "符号"
	}, {
		"name" : "taurus",
		"value" : "&#x2649",
		"category" : "符号"
	}, {
		"name" : "gemini",
		"value" : "&#x264a",
		"category" : "符号"
	}, {
		"name" : "cancer",
		"value" : "&#x264b",
		"category" : "符号"
	}, {
		"name" : "leo",
		"value" : "&#x264c",
		"category" : "符号"
	}, {
		"name" : "virgo",
		"value" : "&#x264d",
		"category" : "符号"
	}, {
		"name" : "libra",
		"value" : "&#x264e",
		"category" : "符号"
	}, {
		"name" : "scorpius",
		"value" : "&#x264f",
		"category" : "符号"
	}, {
		"name" : "sagittarius",
		"value" : "&#x2650",
		"category" : "符号"
	}, {
		"name" : "capricorn",
		"value" : "&#x2651",
		"category" : "符号"
	}, {
		"name" : "aquarius",
		"value" : "&#x2652",
		"category" : "符号"
	}, {
		"name" : "pisces",
		"value" : "&#x2653",
		"category" : "符号"
	}, {
		"name" : "ophiuchus",
		"value" : "&#x26ce",
		"category" : "符号"
	}, {
		"name" : "six-pointed-star",
		"value" : "&#x1f52f",
		"category" : "符号"
	}, {
		"name" : "atm",
		"value" : "&#x1f3e7",
		"category" : "符号"
	}, {
		"name" : "chart",
		"value" : "&#x1f4b9",
		"category" : "符号"
	}, {
		"name" : "heavy-dollar-sign",
		"value" : "&#x1f4b2",
		"category" : "符号"
	}, {
		"name" : "currency-exchange",
		"value" : "&#x1f4b1",
		"category" : "符号"
	}, {
		"name" : "copyright",
		"value" : "&#xa9",
		"category" : "符号"
	}, {
		"name" : "registered",
		"value" : "&#xae",
		"category" : "符号"
	}, {
		"name" : "tm",
		"value" : "&#x2122",
		"category" : "符号"
	}, {
		"name" : "x",
		"value" : "&#x274c",
		"category" : "符号"
	}, {
		"name" : "bangbang",
		"value" : "&#x203c",
		"category" : "符号"
	}, {
		"name" : "interrobang",
		"value" : "&#x2049",
		"category" : "符号"
	}, {
		"name" : "exclamation",
		"value" : "&#x2757",
		"category" : "符号"
	}, {
		"name" : "question",
		"value" : "&#x2753",
		"category" : "符号"
	}, {
		"name" : "grey-exclamation",
		"value" : "&#x2755",
		"category" : "符号"
	}, {
		"name" : "grey-question",
		"value" : "&#x2754",
		"category" : "符号"
	}, {
		"name" : "o",
		"value" : "&#x2b55",
		"category" : "符号"
	}, {
		"name" : "top",
		"value" : "&#x1f51d",
		"category" : "符号"
	}, {
		"name" : "end",
		"value" : "&#x1f51a",
		"category" : "符号"
	}, {
		"name" : "back",
		"value" : "&#x1f519",
		"category" : "符号"
	}, {
		"name" : "on",
		"value" : "&#x1f51b",
		"category" : "符号"
	}, {
		"name" : "soon",
		"value" : "&#x1f51c",
		"category" : "符号"
	}, {
		"name" : "arrows-clockwise",
		"value" : "&#x1f503",
		"category" : "符号"
	}, {
		"name" : "clock12",
		"value" : "&#x1f55b",
		"category" : "符号"
	}, {
		"name" : "clock1230",
		"value" : "&#x1f567",
		"category" : "符号"
	}, {
		"name" : "clock1",
		"value" : "&#x1f550",
		"category" : "符号"
	}, {
		"name" : "clock130",
		"value" : "&#x1f55c",
		"category" : "符号"
	}, {
		"name" : "clock2",
		"value" : "&#x1f551",
		"category" : "符号"
	}, {
		"name" : "clock230",
		"value" : "&#x1f55d",
		"category" : "符号"
	}, {
		"name" : "clock3",
		"value" : "&#x1f552",
		"category" : "符号"
	}, {
		"name" : "clock330",
		"value" : "&#x1f55e",
		"category" : "符号"
	}, {
		"name" : "clock4",
		"value" : "&#x1f553",
		"category" : "符号"
	}, {
		"name" : "clock430",
		"value" : "&#x1f55f",
		"category" : "符号"
	}, {
		"name" : "clock5",
		"value" : "&#x1f554",
		"category" : "符号"
	}, {
		"name" : "clock530",
		"value" : "&#x1f560",
		"category" : "符号"
	}, {
		"name" : "clock6",
		"value" : "&#x1f555",
		"category" : "符号"
	}, {
		"name" : "clock7",
		"value" : "&#x1f556",
		"category" : "符号"
	}, {
		"name" : "clock8",
		"value" : "&#x1f557",
		"category" : "符号"
	}, {
		"name" : "clock9",
		"value" : "&#x1f558",
		"category" : "符号"
	}, {
		"name" : "clock10",
		"value" : "&#x1f559",
		"category" : "符号"
	}, {
		"name" : "clock11",
		"value" : "&#x1f55a",
		"category" : "符号"
	}, {
		"name" : "clock630",
		"value" : "&#x1f561",
		"category" : "符号"
	}, {
		"name" : "clock730",
		"value" : "&#x1f562",
		"category" : "符号"
	}, {
		"name" : "clock830",
		"value" : "&#x1f563",
		"category" : "符号"
	}, {
		"name" : "clock930",
		"value" : "&#x1f564",
		"category" : "符号"
	}, {
		"name" : "clock1030",
		"value" : "&#x1f565",
		"category" : "符号"
	}, {
		"name" : "clock1130",
		"value" : "&#x1f566",
		"category" : "符号"
	}, {
		"name" : "heavy-multiplication-x",
		"value" : "&#x2716",
		"category" : "符号"
	}, {
		"name" : "heavy-plus-sign",
		"value" : "&#x2795",
		"category" : "符号"
	}, {
		"name" : "heavy-minus-sign",
		"value" : "&#x2796",
		"category" : "符号"
	}, {
		"name" : "heavy-division-sign",
		"value" : "&#x2797",
		"category" : "符号"
	}, {
		"name" : "spades",
		"value" : "&#x2660",
		"category" : "符号"
	}, {
		"name" : "hearts",
		"value" : "&#x2665",
		"category" : "符号"
	}, {
		"name" : "clubs",
		"value" : "&#x2663",
		"category" : "符号"
	}, {
		"name" : "diamonds",
		"value" : "&#x2666",
		"category" : "符号"
	}, {
		"name" : "white-flower",
		"value" : "&#x1f4ae",
		"category" : "符号"
	}, {
		"name" : "100",
		"value" : "&#x1f4af",
		"category" : "符号"
	}, {
		"name" : "heavy-check-mark",
		"value" : "&#x2714",
		"category" : "符号"
	}, {
		"name" : "ballot-box-with-check",
		"value" : "&#x2611",
		"category" : "符号"
	}, {
		"name" : "radio-button",
		"value" : "&#x1f518",
		"category" : "符号"
	}, {
		"name" : "link",
		"value" : "&#x1f517",
		"category" : "符号"
	}, {
		"name" : "curly-loop",
		"value" : "&#x27b0",
		"category" : "符号"
	}, {
		"name" : "wavy-dash",
		"value" : "&#x3030",
		"category" : "符号"
	}, {
		"name" : "part-alternation-mark",
		"value" : "&#x303d",
		"category" : "符号"
	}, {
		"name" : "trident",
		"value" : "&#x1f531",
		"category" : "符号"
	}, {
		"name" : "black-medium-square",
		"value" : "&#x25fc",
		"category" : "符号"
	}, {
		"name" : "white-medium-square",
		"value" : "&#x25fb",
		"category" : "符号"
	}, {
		"name" : "black-medium-small-square",
		"value" : "&#x25fe",
		"category" : "符号"
	}, {
		"name" : "white-medium-small-square",
		"value" : "&#x25fd",
		"category" : "符号"
	}, {
		"name" : "black-small-square",
		"value" : "&#x25aa",
		"category" : "符号"
	}, {
		"name" : "white-small-square",
		"value" : "&#x25ab",
		"category" : "符号"
	}, {
		"name" : "small-red-triangle",
		"value" : "&#x1f53a",
		"category" : "符号"
	}, {
		"name" : "black-square-button",
		"value" : "&#x1f532",
		"category" : "符号"
	}, {
		"name" : "white-square-button",
		"value" : "&#x1f533",
		"category" : "符号"
	}, {
		"name" : "black-circle",
		"value" : "&#x26ab",
		"category" : "符号"
	}, {
		"name" : "white-circle",
		"value" : "&#x26aa",
		"category" : "符号"
	}, {
		"name" : "red-circle",
		"value" : "&#x1f534",
		"category" : "符号"
	}, {
		"name" : "large-blue-circle",
		"value" : "&#x1f535",
		"category" : "符号"
	}, {
		"name" : "small-red-triangle-down",
		"value" : "&#x1f53b",
		"category" : "符号"
	}, {
		"name" : "small-h-with-hook",
		"value" : "&#x2b1c",
		"category" : "符号"
	}, {
		"name" : "black-large-suare",
		"value" : "&#x2b1b",
		"category" : "符号"
	}, {
		"name" : "large-orange-diamond",
		"value" : "&#x1f536",
		"category" : "符号"
	}, {
		"name" : "large-blue-diamond",
		"value" : "&#x1f537",
		"category" : "符号"
	}, {
		"name" : "small-orange-diamond",
		"value" : "&#x1f538",
		"category" : "符号"
	}, {
		"name" : "small-blue-diamond",
		"value" : "&#x1f539",
		"category" : "符号"
	} ];

	return emoji;
});