const createNode = function (cord, parent = null) {
	const getPrevMoves = (node = parent) => {
		if (node === null) return [];

		const moves = [node.cord].concat(getPrevMoves(node.parent));
		return moves;
	};

	const getValidMoves = () => {
		const prevMoves = getPrevMoves();
		const validMoves = [];

		// Up
		if (cord[1] + 2 <= 7) {
			if (cord[0] - 1 >= 0) addMove([cord[0] - 1, cord[1] + 2]);
			if (cord[0] + 1 <= 7) addMove([cord[0] + 1, cord[1] + 2]);
		}

		// Down
		if (cord[1] - 2 >= 0) {
			if (cord[0] - 1 >= 0) addMove([cord[0] - 1, cord[1] - 2]);
			if (cord[0] + 1 <= 7) addMove([cord[0] + 1, cord[1] - 2]);
		}

		// Left
		if (cord[0] - 2 >= 0) {
			if (cord[1] - 1 >= 0) addMove([cord[0] - 2, cord[1] - 1]);
			if (cord[1] + 1 <= 7) addMove([cord[0] - 2, cord[1] + 1]);
		}

		// Right
		if (cord[0] + 2 <= 7) {
			if (cord[1] - 1 >= 0) addMove([cord[0] + 2, cord[1] - 1]);
			if (cord[1] + 1 <= 7) addMove([cord[0] + 2, cord[1] + 1]);
		}

		// Adds a move to validMoves if position haven't been visited
		function addMove(cord) {
			let isValid = true;

			for (let i = 0; i < prevMoves.length; i++) {
				if (
					prevMoves[i][0] === cord[0] &&
					prevMoves[i][1] === cord[1]
				) {
					isValid = false;
					break;
				}
			}

			if (isValid) validMoves.push(cord);
		}

		return validMoves;
	};

	return {
		cord,
		parent,
		getValidMoves,
		getPrevMoves,
	};
};

function knightMove(startCord, endCord) {
	const startNode = createNode(startCord);

	let queue = [startNode];

	// BFS
	const newQueue = [];
	const validPaths = [];
	while (queue.length > 0) {
		const currentNode = queue.shift();

		if (
			currentNode.cord[0] === endCord[0] &&
			currentNode.cord[1] === endCord[1]
		)
			validPaths.push(
				currentNode.getPrevMoves().reverse().concat([endCord])
			);

		currentNode.getValidMoves().forEach((move) => {
			newQueue.push(createNode(move, currentNode));
		});

		if (queue.length === 0) {
			if (validPaths.length > 0) {
				return validPaths;
			}

			queue = newQueue.splice(0, newQueue.length);
		}
	}

	return "Error!";

	function getValidMoves(cord, prevMoves = []) {
		const validMoves = [];

		// Up
		if (cord[1] + 2 <= 7) {
			if (cord[0] - 1 >= 0) addMove([cord[0] - 1, cord[1] + 2]);
			if (cord[0] + 1 <= 7) addMove([cord[0] + 1, cord[1] + 2]);
		}

		// Down
		if (cord[1] - 2 >= 0) {
			if (cord[0] - 1 >= 0) addMove([cord[0] - 1, cord[1] - 2]);
			if (cord[0] + 1 <= 7) addMove([cord[0] + 1, cord[1] - 2]);
		}

		// Left
		if (cord[0] - 2 >= 0) {
			if (cord[1] - 1 >= 0) addMove([cord[0] - 2, cord[1] - 1]);
			if (cord[1] + 1 <= 7) addMove([cord[0] - 2, cord[1] + 1]);
		}

		// Right
		if (cord[0] + 2 <= 7) {
			if (cord[1] - 1 >= 0) addMove([cord[0] + 2, cord[1] - 1]);
			if (cord[1] + 1 <= 7) addMove([cord[0] + 2, cord[1] + 1]);
		}

		// Adds a move to validMoves if position haven't been visited
		function addMove(cord) {
			let isValid = true;

			for (let i = 0; i < prevMoves.length; i++) {
				if (
					prevMoves[i][0] === cord[0] &&
					prevMoves[i][1] === cord[1]
				) {
					isValid = false;
					break;
				}
			}

			if (isValid) validMoves.push(cord);
		}

		return validMoves;
	}
}

const moves = knightMove([3, 3], [4, 3]);
const moveCount = moves[0].length - 1;
console.log(`Shortest path is ${moveCount} moves!`);
console.log(`All possible paths:`);
console.log(moves);
