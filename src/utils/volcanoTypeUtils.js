export default function getVolcanoTypes(vulcanoType) {

    const volcanoTypes = [
        'Supervolcanoes',
        'Submarine',
        'Subglacial',
        'Mud',
        'Stratovolcanoes',
        'Shield'
    ];

    const types = volcanoTypes.map(type => ({
        value: type, 
        label: type, 
        selected: vulcanoType === type ? 'selected' : ''}));

    return types;
}