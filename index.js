function knightMove(startCord, endCord) {
	return recMove(startCord, endCord);

	function recMove(current, end, prevMoves = []) {
		prevMoves.push([current[0], current[1]]);
		const validMoves = [];

		// Up
		if (current[1] + 2 <= 7) {
			if (current[0] - 1 >= 0) addMove([current[0] - 1, current[1] + 2]);
			if (current[0] + 1 <= 7) addMove([current[0] + 1, current[1] + 2]);
		}

		// Down
		if (current[1] - 2 >= 0) {
			if (current[0] - 1 >= 0) addMove([current[0] - 1, current[1] - 2]);
			if (current[0] + 1 <= 7) addMove([current[0] + 1, current[1] - 2]);
		}

		// Left
		if (current[0] - 2 >= 0) {
			if (current[1] - 1 >= 0) addMove([current[0] - 2, current[1] - 1]);
			if (current[1] + 1 <= 7) addMove([current[0] - 2, current[1] + 1]);
		}

		// Right
		if (current[0] + 2 <= 7) {
			if (current[1] - 1 >= 0) addMove([current[0] + 2, current[1] - 1]);
			if (current[1] + 1 <= 7) addMove([current[0] + 2, current[1] + 1]);
		}

		function addMove(cord) {
			let isValid = true;

			for (let i = 0; i < prevMoves.length; i++) {
				if (prevMoves[i][0] === cord[0] && prevMoves[i][1] === cord[1]) {
					isValid = false;
					break;
				}
			}

			if (isValid) validMoves.push(cord);
		}

		for (let i = 0; i < validMoves.length; i++) {
			if (validMoves[i][0] === end[0] && validMoves[i][1] === end[1]) {
				prevMoves.push([end[0], end[1]]);

				return prevMoves;
			}
		}

		for (let i = 0; i < validMoves.length; i++) {
			return recMove(validMoves[i], end, prevMoves);
		}
	}
}

console.log(knightMove([0, 0], [1, 2]));
