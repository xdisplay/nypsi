const smallCaps = require('smallcaps');

module.exports = {
    name: "smallcaps",
    description: "change any text to small caps",
    category: "fun",
    run: async (message, args) => {

        if (args.length == 0) {
            return message.channel.send("❌ $smallcaps <text>");
        }

        let lols = "";

        for (let word of args) {
            lols = lols + " " + word;
        }

        message.channel.send(smallCaps(lols.toString()));

    }
};