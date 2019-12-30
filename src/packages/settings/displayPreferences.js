const m = require("mithril")

const {
    getPref,
    setPref,
} = patchfox;

class DisplayPreferences {

    messageTypeInput(key, blurb) {
        return m("label.form-switch",
            m("input[type=checkbox]", {
                onchange: (ev) => {
                    console.log(key, ev.target.checked)
                    setPref(key, ev.target.checked)
                },
                checked: getPref(key, true)
            }), [
                m("i.form-icon"),
                m.trust(blurb)
            ])
    }

    view(vnode) {
        return [
            m("h1.title", "Display Preferences"),
            m("form.form-group", [
                m("label.form-label", `
                Feed column size. There is research that says that a short column size makes
                for a more pleasant reading experience, still some users prefer to use the
                full screen space. Your choice is between reading through long text lines or
                short ones.
                `),
                m("label.form-radio", [
                    m("input[type=radio]", {
                        name: "column-size",
                        value: "short",
                        checked: getPref("columnSize", "short") === "short",
                        onchange: () => setPref("columnSize", "short")
                    }),
                    m("i.form-icon"),
                    "Short Column"
                ]),
                m("label.form-radio", [
                    m("input[type=radio]", {
                        name: "column-size",
                        value: "long",
                        checked: getPref("columnSize", "short") === "long",
                        onchange: () => setPref("columnSize", "long")
                    }),
                    m("i.form-icon"),
                    "Long Column"
                ]),

                m("label.form-label[for=limit]", "Messages per page"),
                m("input.form-input[type=number]", {
                    name: "limit",
                    value: getPref("limit", 10),
                    onchange: (ev) => setPref("limit", event.target.value)
                }),
                m("span", [
                    "Which message types do you want to see? ",
                    m("a", {
                        href: "/docs/index.html#/message_types/",
                        target: "_blank"
                    }, "Click here for more information about Message Types")
                ]),
                this.messageTypeInput("showTypeAbout", "<b>About</b> People setting avatars and descriptions; gatherings"),
                this.messageTypeInput("showTypeBlog", "<b>Blog</b> long form posts."),
                this.messageTypeInput("showTypeChannel", "<b>Channel</b> People subscribing/unsubscribing to channels."),
                this.messageTypeInput("showTypeContact", "<b>Contact</b> People following/unfollowing each other."),
                this.messageTypeInput("showTypePost", "<b>Post</b> Common content post, leave this on or it is not that fun."),
                this.messageTypeInput("showTypePrivate", "<b>Pub</b> Pub server announcements."),
                this.messageTypeInput("showTypePub", "<b>Private</b> Private messages"),
                this.messageTypeInput("showTypeVote", "<b>Vote</b> People liking/digging stuff")
            ]),
        ]
    }
}

module.exports = DisplayPreferences