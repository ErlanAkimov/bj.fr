import { CardType } from "../../types/cardType";

const calculateHandPoints = (hand: CardType[]) => {
    let points = 0;
    let aceCount = 0;

    hand.forEach((card) => {
		if (card.value === 'hidden') return;
        if (card.value === "A") {
            aceCount++;
            points += 11;
        } else if (["K", "Q", "J"].includes(card.value)) {
            points += 10;
        } else {
            points += Number(card.value);
        }
    });

    // Корректируем очки, если перебор и есть тузы
    while (points > 21 && aceCount > 0) {
        points -= 10;
        aceCount--;
    }

    return points;
};

export default calculateHandPoints;