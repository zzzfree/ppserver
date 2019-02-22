
var app = null;

function init(){ 
  
  const YourComponent = {
    data() {
      return {
        topOffset: '0%',
        bottomOffset: '0%',
        repeat: true 
      }
    },
    methods: {
      onUpdate(item) {
        // Do something with values...
        // isVisible, isAbove, isBelow, isPartiallyAbove, isPartiallyBelow, intersectionRatio
        // See Properties Section for details
        console.log(item);
      }
    }
  }

  Vue.component('YourComponent', YourComponent);

    Vue.component('imageitem', { 
        props:['v'],
        methods: {
            onUpdate(item) {
              // Do something with values...
              // isVisible, isAbove, isBelow, isPartiallyAbove, isPartiallyBelow, intersectionRatio
              // See Properties Section for details
              console.log(item);
            }
          },
        data() {
          return {
            topOffset: '0%',
            bottomOffset: '0%',
            repeat: true 
          }
        },
        template: `
          <label v-on:click='v.isImage=!v.isImage' >
            {{ v.path }} x {{ v.isImage ? 'yes' : 'no' }}
            <img v-if='v.isImage' v-bind:src='"img/" + v.path' width='80'/>
          </label>
        `
      });

      Vue.component('items', { 
          props:['data'],  
          template: `
            <ul>
                <li v-for="v in data">
                    <OnVisible topOffset="-20%"
                    bottomOffset="-20%"
                    :repeat="true">
                        <div class="box"
                                :style="{backgroundColor: '#e6e6e6'}"
                                slot-scope="{onVisible}">
                                <div v-for="(value, key) in onVisible"
                                :key="key">
                             <h4>{{key}}</h4>: <h5>{{value}}</h5>
                           </div>
                            <imageitem v-bind:v="v"/>         
                             </div>
                     </OnVisible>
                </li>
            </ul>
          `
        });
 


    app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!',
          data : []
        } 
      });
      
}

function go(){ 

    axios.get('./users')
    .then(function(rsp){
        console.log(rsp.data);
        var d = [];
        var j = 0;
        for(i=0; i<1; i++){
            _.each(rsp.data, function(v){
                if(++j>60) return;
                d.push({
                    isImage: v.indexOf('.')>=0,
                    path: v
                })
            }); 
        }

        app.data = [];
        app.data = d;
    })

}


