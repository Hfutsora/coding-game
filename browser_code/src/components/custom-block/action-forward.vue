<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';

Blockly.setLocale(Zh);
Blockly.Blocks['action-forward'] = {
  init: function() {
    this.jsonInit({
      message0: '前进',
      previousStatement: null,
      nextStatement: null,
      colour: 208,
      tooltip: '向前一格'
    });
  }
};
Blockly.JavaScript['action-forward'] = function(block) {
  return `this.game.moveforward('${block.id}');\n`;
};

export default({

});
</script>
