<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-turtle'] = {
  init: function() {
    const DIRECTIONS = [
      ['前进', 'this.game.turtleForward'],
      ['左转', 'this.game.turtleLeft'],
      ['右转', 'this.game.turtleRight']
    ];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += ' \u21BA';
    DIRECTIONS[2][0] += ' \u21BB';
    this.setColour(208);
    this.appendDummyInput()
      .appendField('乌龟')
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'ACTION');
    this.setTooltip('控制乌龟移动');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.JavaScript['action-turtle'] = function(block) {
  const argument = `${block.getFieldValue('ACTION')}('${block.id}')\n`;

  return argument;
};
export default {};
</script>
