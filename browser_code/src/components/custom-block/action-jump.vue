<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-jump'] = {
  init: function() {
    this.jsonInit({
      message0: '跳',
      previousStatement: null,
      nextStatement: null,
      colour: 208,
      tooltip: '前进两格'
    });
  }
};
Blockly.JavaScript['action-jump'] = function(block) {
  return `this.game.jump('${block.id}');\n`;
};
export default {};
</script>
