import { createApp, defineComponent, ref } from "vue";
import Notification from "./notification.vue";
// Track all instances of notifications currently open
const notificationState: any = ref([]);
const position: any = ref("top-right");
// Set default values
const durationDefault = 4500;
const typeDefault = "primary";
// Create a new notification
const app = defineComponent({
  extends: Notification,
  data() {
    return { notificationState, position };
  },
  methods: {
    // Remove the notification from state
    closeNotification(key: any) {
      const index = notificationState.value.findIndex(
        (n: any) => key === n.key
      );
      clearTimeout(notificationState.value[index]._timer);
      notificationState.value.splice(index, 1);
    },
    pauseInterval(key: any) {
      const index = notificationState.value.findIndex(
        (n: any) => key === n.key
      );
      if(notificationState.value[index]?.hoverTime) {
        notificationState.value[index].hoverTime = Date.now();
      }
        clearInterval(notificationState.value[index]._timer);
      if (notificationState.value[index].newTimer) {
        clearInterval(notificationState.value[index].newTimer);
      }
    },

    resumeInterval(key: any) {
      const index = notificationState.value.findIndex(
        (n: any) => key === n.key
      );
      // Calculate Remaining time
      if(!notificationState.value[index]) return
      let remaining =
        notificationState.value[index].duration -
        (notificationState.value[index].hoverTime -
          notificationState.value[index].startTime) -
        notificationState.value[index].prevHoverDelay;
      // Calculate Previous Hover Delay
      notificationState.value[index].prevHoverDelay =
        notificationState.value[index].prevHoverDelay +
        (notificationState.value[index].hoverTime -
          notificationState.value[index].startTime);
      notificationState.value[index].newTimer = setTimeout(() => {
        closeNotificationtest(key); // Restart the interval after the pause
      }, remaining);
      notificationState.value[index].startTime = Date.now();
    },
  },
});

const notificationContainer = document.createElement("div");
notificationContainer.id = "notification-container";
document.body.appendChild(notificationContainer);
createApp(app).mount(notificationContainer);
function newNotification(args: any, where: string) {
  let isNotRepeating = true;
  notificationState.value.forEach((el: any) => {
    if(!args.hasOwnProperty('isRepeat') || (args.hasOwnProperty('isRepeat') && !args.isRepeat)){
      el.title == args.title &&
      el.message == args.message &&
      el.duration == args.duration
        ? (isNotRepeating = false)
        : "";
    }
   
  });
  if (isNotRepeating) {
    if (args?.title == notificationState.value)
      if (typeof args === "string") {
        args = {
          message: args,
        };
      }
    args.key
      ? (args.key = args.key)
      : (args.key = new Date().getMilliseconds());
    args.duration = args.duration || durationDefault;
    args.type = args.type || typeDefault;
    args._timer = setTimer(args.key, args.duration);
    where ? (position.value = where) : "";
    args.startTime = Date.now();
    args.prevHoverDelay = 0;

    notificationState.value.push(args);
  }
}

// Set a timer to kill the notification after the specified duration
function setTimer(key: any, duration: any) {
  return setTimeout(() => {
    closeNotificationtest(key);
  }, duration);
}

function closeNotificationtest(key: any) {
  const index = notificationState.value.findIndex((n: any) => key === n.key);

  clearTimeout(notificationState.value[index]._timer);
  notificationState.value.splice(index, 1);
}

const api = {
  open: newNotification,
};

export default api;
