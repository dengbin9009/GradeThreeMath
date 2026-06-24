<script setup lang="ts">
import { computed, ref } from "vue";
import SceneStage from "../shared/scene/SceneStage.vue";
const props = defineProps<{ parameters: { heads: number; legs: number } }>();
type Pose = "standing" | "prepare" | "lift-two-legs" | "hold-result";
const pose = ref<Pose>("standing");
const heads = computed(() => Math.max(1, Math.round(props.parameters.heads)));
const legs = computed(() => Math.max(heads.value * 2, Math.round(props.parameters.legs)));
const rabbits = computed(() => Math.max(0, Math.round((legs.value - heads.value * 2) / 2)));
const chickens = computed(() => Math.max(0, heads.value - rabbits.value));
const remainingLegs = computed(() => legs.value - heads.value * 2);
const image = (animal: "chicken" | "rabbit") => `/assets/chicken-rabbit/${animal}-${pose.value === 'standing' ? '00-standing' : pose.value === 'prepare' ? '01-prepare' : pose.value === 'lift-two-legs' ? '02-lift-two-legs' : '03-hold-result'}.png`;
</script>

<template>
  <SceneStage module-id="M20" aspect-ratio="18 / 9" :min-heights="{ desktop: 520, tablet: 500, mobile: 520 }">
  <div class="animal-lab">
    <div class="chalkboard">
      <strong>{{ heads }} 个头 · {{ legs }} 条腿</strong>
      <span v-if="pose === 'standing'">先让每只动物准备抬起 2 条腿</span>
      <span v-else>拿掉 {{ heads }}×2 条腿，地上剩下 {{ remainingLegs }} 条腿</span>
      <b v-if="pose === 'hold-result'">兔 {{ remainingLegs }}÷2 = {{ rabbits }} 只，鸡 {{ chickens }} 只</b>
    </div>
    <div class="animals">
      <img v-for="n in chickens" :key="`c-${n}`" data-animal="chicken" :src="image('chicken')" alt="鸡" />
      <img v-for="n in rabbits" :key="`r-${n}`" data-animal="rabbit" :src="image('rabbit')" alt="兔" />
    </div>
    <div data-leg-counter class="leg-line" :class="{ visible: pose !== 'standing' }">剩下 {{ remainingLegs }} 条腿，每只兔贡献 2 条</div>
    <div data-playful-feedback class="animal-feedback">{{ pose === 'standing' ? '先别抢答，让每个头都先排好队。' : '每个头先抬两条腿，多出来的腿一对一收走。' }}</div>
    <div class="controls">
      <button @click="pose = 'standing'">站好</button>
      <button @click="pose = 'prepare'">准备</button>
      <button data-action="lift" @click="pose = 'lift-two-legs'">一起抬腿</button>
      <button @click="pose = 'hold-result'">看结果</button>
    </div>
  </div>
  </SceneStage>
</template>

<style scoped>
.animal-lab { min-height: 100%; display: grid; grid-template-rows: auto 1fr auto auto auto; background: #e9f7ef; }.chalkboard { min-height: 76px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 16px; padding: 12px 20px; color: white; background: #24553d; }.chalkboard strong { font-size: 20px; }.chalkboard b { color: #ffe082; }.animals { min-height: 300px; padding: 24px; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: 10px; background-image: linear-gradient(transparent 82%, #b9d9bb 82%); }.animals img { width: clamp(62px, 8vw, 105px); height: clamp(82px, 11vw, 135px); object-fit: contain; }.leg-line { text-align: center; min-height: 44px; padding: 10px; color: var(--color-muted); background: white; }.leg-line.visible { color: var(--color-primary); font-weight: 900; }.animal-feedback { margin: 0 auto 10px; width: max-content; max-width: calc(100% - 24px); padding: 8px 12px; border: 1px solid #bbf7d0; border-radius: 7px; background: #ffffffd9; color: #166534; font-weight: 900; text-align: center; }.controls { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--color-line); }.controls button { border: 0; border-right: 1px solid var(--color-line); background: white; font-weight: 800; }.controls button:nth-child(3) { color: white; background: var(--color-primary); }
@media (max-width: 600px) { .animals { min-height: 360px; padding: 12px; gap: 4px; }.animals img { width: 58px; height: 80px; }.controls { grid-template-columns: 1fr 1fr; } }
</style>
