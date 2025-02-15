import React from 'react';
import DealerHand from '../../../components/DealerHand/DealerHand';
import UserHand from '../../../components/UserHand/UserHand';
import styles from '../Game.module.scss';
import { useAppSelector } from '../../../redux/hooks';


const GameHands: React.FC = () => {
	const game = useAppSelector((state) => state.game);
	return (
		<>
			<DealerHand />


			<div className={styles.gameBank}>
				<p className={styles.bank}>bank</p>	
                <p>{(game.bet * 2).toFixed(2)}<span> TON</span></p>
				
            </div>
			<UserHand />
		</>
	);
};


export default GameHands;