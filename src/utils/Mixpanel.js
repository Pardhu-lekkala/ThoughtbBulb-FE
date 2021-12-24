import mixpanel from "mixpanel-browser";

mixpanel.init("8abc5e4c00507779f17faaa9c10ca6b8", {
  //debug: true,
  ignore_dnt: true,
});
//mixpanel.init("YOUR_MIXPANEL_TOKEN");

//let env_check = process.env.NODE_ENV === "production";
let env_check = true;

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
