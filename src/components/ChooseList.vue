<script>
export default{
    data(){
        return{
        }
    },methods:{
        leave(){
            this.$emit("leave")
        },
        save(){
            this.$emit("save",this.tochoose)
        },
        choose(index){
            this.tochoose.chosen = index
            this.save()
        }
    },props:["tochoose"],
      emits:['leave', 'save']
}
</script>

<template>
    <div class="bkg" @click="leave"></div>
    <div class="form">
        <div v-for="(item,index) of tochoose.list" @click="choose(index)" class="case" :id="tochoose.chosen == index ? 'chosen' : null" >
            <div class="info">
                {{item}}
            </div>
        </div>
    </div>
</template>



<style scoped>
body {
    width: 100%;
    height: 100%;
}

.bkg {
    z-index: 2000;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
}

.form {
    z-index: 2001;
    padding: 16px 8px;
    background-color: white;
    width: 200px;
    max-width: 500px;
    text-align: center;
    border-radius: 8px;
    flex-direction: column;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.case {
    flex-basis: 48px;
    position: relative;
    margin: 0px 8px;
    transition: background-color 0.3s ease;
}

.case:nth-child(1) .info {
    border-top: 0px;
}

#chosen.case {
    color: white;
    border-radius: 8px;
    background-color: rgb(21, 108, 222);
}

.case:hover {
    color: white;
    border-radius: 8px;
    background-color: rgb(21, 108, 222);
}

.info {
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: calc(100% - 16px);
    height: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.397);
}</style>

