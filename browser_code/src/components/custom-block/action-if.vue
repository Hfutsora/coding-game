<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-if'] = {
  init: function() {
    const DIRECTIONS = [
      ['前面有路', 'this.game.isPathForward'],
      ['左边有路', 'this.game.isPathLeft'],
      ['右边有路', 'this.game.isPathRight'],
      ['前方有石头', 'this.game.isStoneForward']
    ];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += ' \u21BA';
    DIRECTIONS[2][0] += ' \u21BB';
    DIRECTIONS[3][0] += ' \u21BB';
    this.setColour(208);
    this.appendDummyInput()
      .appendField('如果')
      .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO').appendField('则');
    this.setTooltip('如果xx有路或石头，则xx');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.JavaScript['action-if'] = function(block) {
  const argument = `${block.getFieldValue('DIR')}('${block.id}')\n`;
  const branch = Blockly.JavaScript.statementToCode(block, 'DO');
  const code = `if (${argument}) {\n${branch}}\n`;

  return code;
};
export default {};
</script>
