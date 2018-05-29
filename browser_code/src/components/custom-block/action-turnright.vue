<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-turnright'] = {
  init: function() {
    this.jsonInit({
      message0: '右转',
      previousStatement: null,
      nextStatement: null,
      colour: 208,
      tooltip: '向右转一格'
    });
  }
};
Blockly.JavaScript['action-turnright'] = function(block) {
  return `this.game.turnright('${block.id}');\n`;
};
export default {};
</script>
