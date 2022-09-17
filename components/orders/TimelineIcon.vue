<template>
  <div>
    <div v-if="status === 'pending'">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="6" transform="rotate(-180 6 6)" fill="#E1E1E1"/>
      </svg>
    </div>
    <div v-if="status === 'active'">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_7_29959)">
          <circle cx="8" cy="8" r="6" transform="rotate(-180 8 8)" fill="#BAC8FF"/>
        </g>
        <circle cx="8" cy="8" r="4" transform="rotate(-180 8 8)" fill="#6F88EA"/>
        <defs>
          <filter id="filter0_f_7_29959" x="0" y="0" width="16" height="16" filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_7_29959"/>
          </filter>
        </defs>
      </svg>
    </div>
    <div v-if="status === 'past'">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_7_35852)">
          <circle cx="8" cy="8" r="6" transform="rotate(-180 8 8)" fill="#BAC8FF"/>
        </g>
        <defs>
          <filter id="filter0_f_7_35852" x="0" y="0" width="16" height="16" filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_7_35852"/>
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineIcon',
  props: {
    status: {
      type: String,
      default: 'pending'
    }
  }
}
</script>
