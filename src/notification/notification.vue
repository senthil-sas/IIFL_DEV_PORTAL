<template>
  <div class="notification-container-outer" :class="position">
    <transition-group name="notification" tag="div">
      <div class="notification-item shadow-[0px_0px_10px_rgba(0,0,0,0.45)] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.25)]" :class="notification.type" v-for="notification in notificationState"
        :key="notification.key" @mouseenter="pauseInterval(notification.key)"
        @mouseleave="resumeInterval(notification.key)">
        <div class="notification-content">
          <div v-if="notification.title" class="notification-title break-words">
            {{ notification.title }}
          </div>
          <div class="notification-message break-words" v-if="notification.message">{{ notification.message }}</div>
          <div class="notification-status break-words" v-if="notification.status">{{ notification.status }}</div>
          <div class="notification-status break-words" v-if="notification.comment">{{ notification.comment }}</div>
        </div>
        <div class="close hover:bg-[#dddddd] flex items-center" @click="closeNotification(notification.key)">×</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "Notification-c",
  data() {
    return {
      notificationState: [],
      position: "",
    };
  },
};
</script>
<style>
.notification-container-outer {
  position: fixed;
  z-index: 99999;
  width: 384px;
  max-width: calc(100vw - 32px);
  margin-right: 24px;
}

.notification-item {
  border-radius: 4px;
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15); */
  background: #fff;
  /* line-height: 1.5; */
  position: relative;
  margin-bottom: 16px;
  overflow: hidden;
  border-left: 16px solid #ccc;
  transition: all 0.3s;
  display: block;
  width: 100%;
  display: flex;
  font-size: 14px;
}

.notification-item.primary {
  border-left-color: #989898;
}

.notification-item.danger {
  border-left-color: #ec4c47;
}

.notification-item.success {
  border-left-color: #47b881;
}

.notification-item.info {
  border-left-color: orangered;
}

.notification-item.buyToastColor {
  border-left-color: #2992ec;
}

.notification-item.sellToastColor {
  border-left-color: #f75723;
}

.notification-content {
  flex: 1;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 6px;
}

.notification-title {
  @apply font-semibold;
}

.notification-message {
  @apply font-medium;
}

.notification-status {
  @apply font-medium;
}

.close {
  padding: 12px;
  cursor: pointer;
  font-size: 24px;
  color: #888;
  transition: all 0.3s;
}

.close:hover {
  color: #222;
}

/* Vue Animations */
/* .notification-enter {
  opacity: 0;
  transform: translateX(384px);
}

.notification-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.notification-leave-active {
  position: absolute;
} */

.top-right {
  right: 20px;
  top: 20px;
}

.bottom-right {
  right: 20px;
  bottom: 20px;
}

.top-left {
  left: 20px;
  top: 20px;
}

.notification-message {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  @apply max-w-[290px]
}

.notification-status {
  @apply max-w-[290px] !text-xs;
}


.notification-enter-from {
  opacity: 0;
  transform: translateX(384px);
}

.notification-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.notification-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.notification-leave-from {
  opacity: 1;
  max-height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
}

.notification-leave-active {
  transition: opacity 0.3s, max-height 0.3s, padding 0.3s;
}

.notification-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
