<script setup>
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import makeTips from '@/scripts/tipsappend'
import { ref } from 'vue'

const global = useGlobalStore()
const { acting } = storeToRefs(global)

// 返回
function back() {
    global.alldown()
    global.tochat(false)
}

// 等待
function wait() {
    makeTips.warn('此功能尚未开放')
}

// 分享
function getRatio() {
    const devicePixelRatio = ref(0)
    const screen = window.screen
    const ua = navigator.userAgent.toLowerCase()
    let ratio = 0

    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI)
            ratio = screen.deviceXDPI / screen.logicalXDPI
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth
    }
    if (ratio) devicePixelRatio.value = Math.round(ratio)
    return ratio
}

const emit = defineEmits(['export'])

function exportChat() {
    let ratio = getRatio()
    emit('export', ratio)
}
</script>

<template>
    <header>
        <div class="back" @click="back">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M776.191485 982.272081L296.192421 515.840991c-1.279998-1.279998-1.535997-2.815995-1.535997-3.839993 0-1.023998 0.256-2.559995 1.535997-3.839992L775.935485 41.729915c6.143988-5.887989 6.399988-15.871969 0.511999-22.015957l-14.335972-14.847971c-5.887989-6.399988-15.61597-6.399988-21.759957-0.511999L260.60849 470.785079c-11.263978 11.007979-17.407966 25.59995-17.407966 41.215919 0 15.61597 6.143988 30.463941 17.407966 41.21592l479.999064 466.43109c6.143988 5.887989 15.871969 5.631989 21.759958-0.511999l14.335972-14.847971c5.887989-6.143988 5.631989-16.127969-0.511999-22.015957z"
                ></path>
            </svg>
        </div>
        <div class="name" v-if="acting.name">{{ acting.name }}</div>
        <div class="options">
            <div class="system">
                <div class="button min" @click="wait">
                    <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M746.666667 490.666667v42.666666a21.333333 21.333333 0 0 1-21.333334 21.333334H298.666667a21.333333 21.333333 0 0 1-21.333334-21.333334v-42.666666A21.333333 21.333333 0 0 1 298.666667 469.333333h426.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z"
                              fill="#333333"></path>
                    </svg>
                </div>
                <div class="button max" @click="wait()">
                    <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M736 234.666667H288c-29.44 0-53.333333 23.893333-53.333333 53.333333v448c0 29.44 23.893333 53.333333 53.333333 53.333333h448c29.44 0 53.333333-23.893333 53.333333-53.333333V288c0-29.44-23.893333-53.333333-53.333333-53.333333zM725.333333 298.666667v426.666666H298.666667V298.666667h426.666666z"
                              fill="#333333"></path>
                    </svg>
                </div>
                <div class="button close" @click="wait()">
                    <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path d="M344.362667 299.093333L512 466.773333l167.68-167.68a21.333333 21.333333 0 0 1 27.178667-2.432l2.986666 2.474667 15.061334 15.061333a21.333333 21.333333 0 0 1 0 30.165334L557.226667 512l167.68 167.68a21.333333 21.333333 0 0 1 0 30.165333l-15.104 15.061334a21.333333 21.333333 0 0 1-30.165334 0l-167.68-167.637334-167.594666 167.68a21.333333 21.333333 0 0 1-27.178667 2.432l-2.986667-2.474666-15.061333-15.061334a21.333333 21.333333 0 0 1 0-30.165333l167.594667-167.68-167.594667-167.594667a21.333333 21.333333 0 0 1 0-30.165333l15.061333-15.061333a21.333333 21.333333 0 0 1 30.165334 0z"
                              fill="#333333"></path>
                    </svg>
                </div>
            </div>
            <div class="export" @click="exportChat" title="导出聊天记录">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path d="M677.333333 245.333333a101.333333 101.333333 0 1 1-76.032 168.362667l-154.026666 85.546667a107.776 107.776 0 0 1-0.64 29.909333l151.978666 84.394667a101.333333 101.333333 0 1 1-22.570666 60.8l-158.250667-87.978667a106.666667 106.666667 0 1 1 2.944-145.621333l155.562667-86.357334a101.333333 101.333333 0 0 1 101.034666-109.056z m0 394.666667a37.333333 37.333333 0 1 0 0 74.666667 37.333333 37.333333 0 0 0 0-74.666667zM341.333333 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m336-160a37.333333 37.333333 0 1 0 0 74.666667 37.333333 37.333333 0 0 0 0-74.666667z"
                    ></path>
                </svg>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    flex-basis: 60px;
    flex-shrink: 0;
    height: 60px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid rgba(161, 154, 154, 0.626);

    & svg:hover {
        fill: rgb(0, 153, 255);
    }

    .name {
        margin-left: 24px;
        margin-bottom: 8px;
        font-size: 16px;
    }

    .options {
        flex-basis: 96px;
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        flex-direction: row-reverse;

        .system {
            display: flex;
            flex-basis: 100%;

            .button {
                display: flex;
                justify-content: center;
                padding-top: 8px;
                flex: 0 0 32px;

                &.close:hover {
                    background-color: rgb(255, 0, 0)
                }
            }

            .button:hover {
                background-color: rgb(231, 231, 231)
            }
        }

        .export svg {
            width: 32px;
            margin-right: 8px;
        }
    }

}

@media (max-width: 600px) {

    header {
        background: #00A8FF linear-gradient(to right, #00D2F8, #00A8FF);

        & * {
            color: white;
            fill: white;
        }

        .back {
            display: block;
            margin-left: 16px;
            margin-bottom: 8px;

            & svg {
                stroke-width: 3;
            }
        }

        .name {
            padding-bottom: 4px;
        }

        .options {

            .system {
                display: none;
            }

            .export {
                display: flex;
                align-items: end;
                padding-bottom: 4px;
            }
        }
    }
}
</style>