declare module '*.vue' {
  import { defineComponent } from 'vue';

  const c = defineComponent<{}>();
  export default c;

//   const component: ReturnType<typeof defineComponent>;
//   export default component;
}

