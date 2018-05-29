<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-turnleft'] = {
  init: function() {
    this.jsonInit({
      message0: '左转',
      previousStatement: null,
      nextStatement: null,
      colour: 208,
      tooltip: '向左转一格'
    });
  }
};
Blockly.JavaScript['action-turnleft'] = function(block) {
  return `this.game.turnleft('${block.id}');\n`;
};
export default {};
</script>
