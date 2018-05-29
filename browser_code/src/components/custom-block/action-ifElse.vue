<script>
import Blockly from 'node-blockly/browser';
import Zh from 'node-blockly/lib/i18n/zh-hans';
Blockly.setLocale(Zh);
Blockly.Blocks['action-ifElse'] = {
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
    this.appendStatementInput('ELSE').appendField('否则');
    this.setTooltip('如果xx有路，则xx。否则xx');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.JavaScript['action-ifElse'] = function(block) {
  const argument = `${block.getFieldValue('DIR')}('${block.id}')\n`;
  const branch0 = Blockly.JavaScript.statementToCode(block, 'DO');
  const branch1 = Blockly.JavaScript.statementToCode(block, 'ELSE');
  const code = `if (${argument}) {\n${branch0}} else {\n${branch1}}\n`;

  return code;
};
export default {};
</script>
