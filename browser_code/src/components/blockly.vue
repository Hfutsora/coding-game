<template>
  <div>
    <el-dialog title="显示代码" :visible.sync="showCodeVisible" class="show-code" :modal-append-to-body="false">
      <p class="show-code">{{showCodeString}}</p>
    </el-dialog>
    <section id="blocklyTotal" class="blockly-total" ref="blocklyTotal">
      <section id="blocklyArea" class="block-area" ref="blocklyArea">
      <section id="workspceBlock" class="block-workspace" ref="workspceBlock">
      </section>
        <section id="toolbox" ref="toolbox" class="tool-box">
          <!-- <block v-for="(val,index) in blocklies" :type="blocklies[index]" :key="index"></block> -->
        </section>
      </section>
      <el-button @click="showCode" class="show-button">查看代码</el-button>
      <el-button @click="runCode" class="run-button">运行</el-button>
    </section>
  </div>
</template>

<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
import '../components/custom-block/action-forward';
import '../components/custom-block/action-turnleft';
import '../components/custom-block/action-turnright';
import '../components/custom-block/action-jump';
import '../components/custom-block/action-if';
import '../components/custom-block/action-ifElse';
import '../components/custom-block/action-turtle';
import '../components/custom-block/action-turnback';
import ConnectGame from '../assets/js/connectGame';

// import { returnBlocks } from '../assets/js/returnBlocks';

Blockly.setLocale(Zh);

export default {
  name: 'blockly',
  data() {
    return {
      workspace: null,
      showCodeVisible: false,
      // blocks: [],
      showCodeString: '你还没有代码块在工作区哦(*/ω＼*)',
      codeButtonVisible: true
    };
  },
  // components: {
  //   block: Blockly
  // },
  props: ['blocklies', 'maps', 'arrays', 'xmlText'],
  methods: {
    renderXML() {
      function blockElement(type) {
        return `<block type="${type}"></block>`;
      }
      function xmlElement(content) {
        return `<xml>${content}</xml>`;
      }
      let content = ``;
      for (const element of this.blocklies) {
        content += blockElement(element);
      }

      const xml = Blockly.Xml.textToDom(xmlElement(content));

      return xml;
    },
    codeXML() {
      const xml = Blockly.Xml.workspaceToDom(this.workspace);
      const xmlText = Blockly.Xml.domToText(xml);

      return xmlText;
    },
    runCode() {
      const map = this.maps;
      const frogPositionX = this.arrays[0];
      const frogPositionY = this.arrays[1];
      const frogDirection = this.arrays[2];
      const turtlePositionY = this.arrays[4];
      const turtlePositionX = this.arrays[3];
      const turtleDirection = this.arrays[5];
      const leave = this.arrays[6];

      // 这里传值
      const game = new ConnectGame({
        leave,
        map,
        frogDirection,
        turtlePositionX,
        turtlePositionY,
        turtleDirection,
        frogPositionX,
        frogPositionY
      });
      const code = Blockly.JavaScript.workspaceToCode(this.workspace);
      Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
      const moveTo = game.runCode(code);
      this.$emit('blockCount', Blockly.mainWorkspace.getAllBlocks().length);
      this.$emit('runGame', moveTo);
      this.codeButtonVisible = false;
    },
    showCode() {
      let code = `${Blockly.JavaScript.workspaceToCode(this.workspace)}`;
      code = code.replace(/this.game./g, '');
      code = code.replace(/'[^']*'/g, '');
      if (code.length > 0) {
        this.showCodeString = code;
      }

      this.showCodeVisible = true;
    }
  },
  watch: {
    blocklies() {
      const blocklyArea = this.$refs.blocklyArea;
      const blocklyDiv = this.$refs.workspceBlock;
      this.workspace = Blockly.inject(blocklyDiv, {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: `${this.getImg()}media/`,
        toolbox: this.renderXML(),
        trashcan: true,
        zoom: {
          controls: true,
          wheel: false
        }
      });
      if (this.xmlText && this.xmlText !== '') {
        const xml = Blockly.Xml.textToDom(this.xmlText);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
      }
      // Blockly.Xml.domToWorkspace(this.renderXML(), this.workspace);
      const onresize = function() {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element = blocklyArea;
        do {
          element = element.offsetParent;
        } while (element);
        const offsetWidth = blocklyArea.offsetWidth;
        blocklyDiv.style.width = `${offsetWidth}px`;
        const offsetHeight = blocklyArea.offsetHeight;
        blocklyDiv.style.height = `${offsetHeight}px`;
      };
      window.addEventListener('resize', onresize, false);
      onresize();
      Blockly.svgResize(this.workspace);
    }
  }
};
</script>
<style lang="less" scoped>
@graHeight: 500px;
.show-code {
  z-index: 1000;
}
.block-workspace {
  position: absolute;
}
.block-area {
  height: 97%;
  width: 100%;
}
.tool-box {
  display: none;
}
.blockly-total {
  line-height: 0;
  position: absolute;
  width: 100%;
  height: @graHeight + 150px;
}
.run-button {
  position: relative;
  float: left;
  top: -50px;
  left: 20px;
  padding: 15px 35px;
  width: 120px;
  text-align: center;
  z-index: 99;
  background: url("../assets/img/run.png") no-repeat;
  background-size: 100% 100%;
  border: none;
  transition: all 0.2s;
  font-size: 120%;
  color: rgba(18, 34, 23, 0.5);
  &:hover {
    filter: brightness(1.1);
  }
}
.show-button {
  top: -50px;
  left: 5px;
  z-index: 99;
  position: relative;
  float: left;
  width: 30%;
  padding: 15px 20px;
}
</style>
