const models = require('../apps/game/models');
const StandardGame = models.StandardGame;
const Frog = models.Frog;
const Turtle = models.Turtle;
const Leave = models.Leave;
const Blockly = models.Blockly;
const logger = require('ktoolkit').logger.output;

const standardGames = [];
async function addMap() {
    for (let i = 0; i < blocklies.length; i++) {
        await Blockly.findOrCreate({
            where: {
                name: blocklies[i]
            }
        });
    }
    for (let i = 0; i < maps.length; i++) {
        const standardGame = StandardGame.build({
            map: maps[i],
            tip: tips[i],
            img: `map/standard-${i+1}.jpg`
        });
        await standardGame.save();
        standardGames.push(standardGame);
    }
    for (let i = 0; i < gameBlocks.length; i++) {
        await standardGames[i].setBlocklies(gameBlocks[i]);
    }
    for (let i = 0; i < frogX.length; i++) {
        const frog = Frog.build({
            x: frogX[i],
            y: frogY[i],
            direction: frogDirection[i]
        });
        await frog.save();
        await standardGames[i].setFrog(frog);
    }
    for (let i = 0; i < turtleX.length; i++) {
        const turtle = Turtle.build({
            x: turtleX[i],
            y: turtleY[i],
            direction: turtleDirection[i]
        });
        await turtle.save();
        await standardGames[i].setTurtle(turtle);
    }
    for (let i = 0; i < leaves.length; i++) {
        for (let j = 0; j < leaves[i].length; j++) {
            const leaf = Leave.build({
                x: leaves[i][j][0],
                y: leaves[i][j][1]
            });
            await leaf.save();
            await standardGames[i].addLeave(leaf);
        }
    }
    logger.info('initialize standard map.');

    await sequelize.close();
}

const blocklies = ['action-forward', 'action-turnright', 'action-jump', 'controls_repeat', 'action-if', 'action-ifElse', 'action-turtle', 'action-turnback', 'action-turnleft'];
const gameBlocks = [
    [1],
    [1,2],
    [1,2,3],
    [1,9,4],
    [1,2,3,4],
    [1,2,4,6],
    [1,2,3,4,6],
    [1,7],
    [1,7],
    [1,3,7],
    [1,7],
    [1,7,4],
    [1,7,8,4],
    [1,6,7,4],
    [1,2,4,5,7]
]
const frogX = [3,2,2,5,2,2,2,4,1,1,2,1,1,1,1];
const frogY = [3,3,3,3,3,3,3,2,2,2,2,1,2,1,1];
const frogDirection = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
const maps = [
    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    '0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    '0,0,0,0,0,0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
    '0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0',
    '0,0,0,0,0,0,0,0,0,0,1,2,1,1,0,0,0,0,1,0,0,2,0,0,0,0,2,0,0,1,0,0,0,0,1,1,2,1,0,0,0,0,0,0,0,0,0,0',
    '0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0',
    '0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,0,0,0,2,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,1,1,2,1,1,0,0,0,0,0,0,0,0,0',
    '0,0,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,1,3,3,3,1,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,0,0,0',
    '0,1,1,3,3,3,1,0,0,0,0,3,3,3,1,0,0,0,0,3,3,3,1,0,0,0,0,3,3,3,1,0,0,0,0,3,3,3,1,0,0,0,0,3,3,3,1,0',
    '0,1,1,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,2,1,0,0,0,3,3,3,0,0,0,0,0,3,3,3,0,0',
    '0,0,3,3,3,0,0,0,0,1,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,3,3,3,1,0,0,0,0,3,3,3,0,0,0',
    '1,3,3,3,3,3,0,0,0,3,1,1,1,3,0,0,0,3,1,1,1,3,0,0,0,3,1,1,1,3,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0',
    '0,1,3,3,3,1,1,0,0,1,3,3,3,3,3,0,0,1,3,3,3,1,1,0,0,1,3,3,3,3,3,0,0,1,3,3,3,1,1,0,0,1,3,3,3,1,1,0',
    '1,3,3,3,3,3,3,0,0,3,1,1,1,1,3,0,0,3,1,1,1,1,3,0,0,3,1,1,1,1,3,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0',
    '1,3,0,3,3,3,3,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,3,3,3,3,0,3,0,0,0,0,0,0,0,0'
];
const tips = [
    '拖动前进，点击运行，小青蛙就可以向前了吃到四叶草了哦',
    '不要问为什么，但是要确保小青蛙走在草地上，没路了记得转弯哦',
    '小青蛙不能走在石头上，可以大跳一步越过石头哦',
    '吃到全部的四叶草才能得到五星哦，不想拖很多块，可以使用一个循环将代码包起来，就可以把包起来的代码做好多次了哦',
    '由于石头的位置有规律，找到规律使用循环，在合适的位置跳过就好了哦',
    '可以用if判断要不要转弯哦',
    '石头位置也可以用if进行判断哦',
    '控制小乌龟可以让他带小青蛙过河哦',
    '可以控制小乌龟自己动哦',
    '可以从小乌龟的背上跳大步哦',
    '小乌龟也会转弯哦',
    '也可以控制小乌龟循环哦',
    '记得用上循环哦',
    '记得用上if判断是否要转弯哦',
    '自己发挥哦'
]

const turtleX = [-1,-1,-1,-1,-1,-1,-1,4,4,1,2,1,1,1,1];
const turtleY = [-1,-1,-1,-1,-1,-1,-1,3,4,4,3,2,3,2,2];
const turtleDirection = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
const leaves = [
    [[3,6]],
    [[3,6]],
    [[3,6]],
    [[2,3],[2,6],[5,6]],
    [[5,3],[2,6],[5,6]],
    [[5,3],[2,7],[5,7]],
    [[5,3],[2,7],[5,7]],
    [[4,6]],
    [[1,7]],
    [[4,8]],
    [[5,4]],
    [[1,6],[5,6],[5,2]],
    [[1,7],[3,7],[5,7]],
    [[1,7],[5,7],[5,2]],
    [[6,8]]
];

addMap();
