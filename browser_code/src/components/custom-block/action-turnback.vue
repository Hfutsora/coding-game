<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-turnback'] = {
  init: function() {
    this.jsonInit({
      message0: '向后转',
      previousStatement: null,
      nextStatement: null,
      colour: 208,
      tooltip: '向后转一格'
    });
  }
};
Blockly.JavaScript['action-turnback'] = function(block) {
  return `this.game.turnback('${block.id}');\n`;
};
export default {};
</script>
