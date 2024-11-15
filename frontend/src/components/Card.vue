<script>
export default{
    props:{
        matched:{
            type:Boolean,
            default:false
        },
        position:{
            type:Number,
            Required:true
        },
        value:{
            type:Number,
            Required:true,
        },
    
    visible:{
        type:Boolean,
        default:false
    }
},
    setup(props,context){
        const selectCard =()=>{
            context.emit('select-card',{
                position:props.position,
                faceValue:props.value
            })
        }
        return{
        selectCard
    }
    }
}
</script>

<template>
    <div class="card" @click="selectCard">
        <div v-if="visible" class="card-face is-front">
        {{value}}-{{ position }}-{{ matched }}
    </div>
    
    <div v-else class="card-face is-back">
        Back
    </div>
    </div>
</template>

<style scoped>
.card{
    border: 5px solid #ccc;
    position: relative;
}

.card-face{
    width: 100%;
    height: 100%;
    position: absolute;
}
.card-face.is-front{
    background: red;
    color:white;
}

.card-face.is-back{
    background: blue;
    color:white;
}
</style>