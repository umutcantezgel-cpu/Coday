export const GEMINI_KEYS = [
    "AIzaSyB5jP8OOs1FrVi92WAPk2fFLOmCBj34uxM",
    "AIzaSyATlqP8wc6R-KxlObHQ5j552eMAVWRhzT8",
    "AIzaSyA6YLfD5BWoffpZWIqjCwKCV3Z7CPH6s70",
    "AIzaSyBOOgZvVkVLwXci_NS1lWmUHn7YAyDVArg",
    "AIzaSyDgMU7RNS5BoTGDhX6swdilwgR-wjSpnzY",
    "AIzaSyC_TrP13i17c4QX_yXKcNjc3sUwaWCjQeo",
    "AIzaSyDa_I0cvAUG4MoK6CbC5SVzhoRe_0BpDY0",
    "AIzaSyCtVYSnfR2y0POGTsqDh22kYbQ8im4At1Y",
    "AIzaSyBP7llBh4UaJJBlaKE70dqQARlpAAEpPnI",
    "AIzaSyBjfFy6XrZk7GXQXfsnqxOBX1mhC2efQ-w",
    "AIzaSyANlUSdAY1tLyoMYgZoaET1ycwr7aRnjWQ",
    "AIzaSyBQ09LB506s6ni-teGs2qQKyF7i9oQV_PI",
    "AIzaSyCV5FSe7fJZ7M9_A1rPxrxxG6orlNFITwE",
    "AIzaSyCFwKCLZzAtJ-mfFts9y-J0bP60ME81w6Q",
    "AIzaSyAaRD9lQFdkDVOkZ5kub1KD57z4iF6aX4Y",
    "AIzaSyCfNs7jF0yTamWZzMEv0XSynBmVHacqkr0",
    "AIzaSyCehrLOfXVM_jiCMwJJqHWnDSy66Qpxvkk",
    "AIzaSyCMPW9xPK1Z6dZ32p-hUeI8xptG3JyY_iw",
    "AIzaSyA58X47XuDI0p2SjE4C1RmZOxl9bbPhDos",
    "AIzaSyCwUJSuMXGN1uV_sLR1Koyogs_i2dWLVh4",
    "AIzaSyBAf6kadlEjeJsdUjmJffxPeYDqMc_wAa0",
    "AIzaSyAQOo6psp0cnGo24ttdGMZGxquevHnsGpI",
    "AIzaSyBVa122YSDvjOBCYRJGf7qjMAK1dWlf-lY",
    "AIzaSyDUgGAoQHmTF1r9ihWHnaWNm2rENqL23gA",
    "AIzaSyAIJgwD-7llPwXs_e_YGtSA5QKL7afD2Tk",
    "AIzaSyBt0GkM8txkGk7aYZhizkxQ542mmzOielU",
    "AIzaSyD7_SQfDE7C3A7rW0XwAy5tfVbOcM9QDeY",
    "AIzaSyCxfyIuxfP-am61gJ8P_97r4Cghfcgk5tc",
    "AIzaSyDRxNr2ssa4FvDrK3qGph40F14B-huzedg",
    "AIzaSyDvdlkYJcqUUfrlDRvqd9_tNXWL4dxEjoo",
    "AIzaSyAF_EsC4rMwp8jPdtGy2xhUqpegXZzpbHM",
    "AIzaSyBHumld8NYuy9jo77XGXcI-jZBJFCz4PsE",
    "AIzaSyCrs3sj3RoQj8OusrSWiBRk5G1Rqf1CWxI",
    "AIzaSyBpKx0JIj1Ok9Kd4LaeVG8GgB492oOFaek",
    "AIzaSyBInOMOXf97mOIZWM97rbLUlIUS1UCbw_4",
    "AIzaSyBtdCv8MV2TNjvJevFjQ6l64pReAAvOa9U",
    "AIzaSyAfXl4MNhIQMV63ExLfpynVlvv3s2w9GRc"
];

export const GOOGLE_MAPS_KEYS = [
    "AIzaSyAaLDFNe09SXeusUnT7G7EgGbqhtJl0Ikk",
    "AIzaSyD7hn48J_9ZfpPfdMFL_fHZXbAsePxCZjg"
];

export const PERPLEXITY_KEY = "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";

// Simple Random Rotator
export function getRandomGeminiKey(): string {
    const min = 0;
    const max = GEMINI_KEYS.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    return GEMINI_KEYS[index];
}
