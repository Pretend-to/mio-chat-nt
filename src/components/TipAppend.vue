<script>

export default {
    data() {
        return {
            timeout: false
        }
    }, props: {
        tips: {
            type: Array,
            required: true
        }
    }
}
</script>

<template>
    <div ref="box" class="tipsbox">
        <div v-for="tip in tips"  class="fade-in">
        <svg v-if="tip.type == 'warn'" style="padding-left: 16px;" t="1697450824459" class="icon" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6147" width="16" height="16">
            <path
                d="M512.165 0.315a511.835 511.835 0 1 0 511.52 511.835A512.229 512.229 0 0 0 512.165 0.315z m208.671 669.323a36.537 36.537 0 1 1-51.734 51.616L512.008 563.767 354.52 719.797a36.537 36.537 0 1 1-51.38-51.97l157.487-155.834L303.77 354.505a36.537 36.537 0 1 1 51.734-51.617L512.56 460.376l157.488-156.07a36.537 36.537 0 0 1 51.38 52.01L563.939 512.11z m0 0"
                fill="#d81e06" p-id="6148"></path>
        </svg>
        <svg v-if="tip.type == 'info'" style="padding-left: 16px;" t="1697458918486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4007" width="16" height="16">
            <path
                d="M512.000002 0a512 512 0 1 0 512 512A512 512 0 0 0 512.000002 0z m223.654358 412.798124l-206.634849 275.527422a64.305451 64.305451 0 0 1-96.92975 6.859248L294.304615 557.313908c-60.018421-60.018421 30.866616-151.032069 90.970778-90.927908l85.311898 85.311898 162.178348-216.194926c51.058528-67.949426 153.904379 9.302855 102.888721 77.295152z"
                fill="#00D66A" p-id="4008"></path>
        </svg>
        <div class="tip" style="padding: 0px 16px;">
            {{ tip.info }}
        </div>
    </div>
    </div>
    
</template>

<style scoped>
.fade-in {
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: rgb(247, 247, 247);
    border-radius: 100px;
    position: fixed;
    bottom: 20px;
    display: flex;
    min-width: 100px;
    height: 32px;
    opacity: 0.1;
    animation: fade 2s forwards;
    left: 50%;
    /* 将元素的左边缘定位到视口的水平中心 */
    transform: translateX(-50%);
    /* 使用负值的 translateX 将元素向左移动自身宽度的一半 */
}

@keyframes fade {
    0% {
        opacity: 0.1;
    }

    30% {
        opacity: 1;
        bottom: 70px
    }

    100% {
        opacity: 0;
        bottom: 20px
    }
}

.tip {
    white-space: nowrap;
}</style>