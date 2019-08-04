
const strings = {
  ChatWelcomeText: "Welcome to Owl Air!",
  TaskLineChatAssigned:
    "{{helper.durationSinceUpdate}} | {{#if task.attributes.title}}{{task.attributes.title}}{{else}}No messages{{/if}}"
};

const colorTheme = {};
const componentProps = {
  // MessagingCanvas: {
  //   memberDisplayOptions: {
  //     yourDefaultName: "Agent",
  //     theirDefaultName: "From Studio",
  //     yourFriendlyNameOverride: false,
  //     theirFriendlyNameOverride: false
  //   }
  // },
  MessageListItem: {
    useFriendlyName: true
  }
};

const loyaltyProps = {
  silver: { background: `linear-gradient(to top, #304352, #d7d2cc)`, color: "white" },
  gold: { background: `linear-gradient(to top, #6d6027, #d3cbb8)`, color: "white" },
  platinum: { background: `linear-gradient(to top, #232526, #414345)`, color: "white" },
  "platinum one": { background: `linear-gradient(to top, #ece9e6, #ffffff)`, color: "black" },
  bronze: { background: "#e40000", color: "white" }
};

export { colorTheme, componentProps, strings, loyaltyProps };
