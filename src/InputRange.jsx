import { useEffect, useState } from 'react'
import './input-range.scss'

const FiltersRange = () => {
	const [rangeValue, setRangeValue] = useState({
		min: 0,
		max: 0,
	})
	const [rangeTrackPercantage, setRangeTrackPercantage] = useState({
		minPercentage: 0,
		maxPercentage: 100,
	})
	const maxValue = 1543000
	const gap = (maxValue / 100) * 1

	useEffect(() => {
		setRangeValue({ ...rangeValue, max: maxValue })
	}, [])

	const setRangeValueHandler = (e) => {
		const { name, value } = e.target

		setRangeValue({
			...rangeValue,
			[name]: parseInt(value),
		})

		if (name === 'min' && parseInt(value) > rangeValue.max - gap) {
			setRangeValue({
				...rangeValue,
				min: parseInt(rangeValue.max - gap),
			})
		}

		if (name === 'max' && parseInt(value) < rangeValue.min + gap) {
			setRangeValue({
				...rangeValue,
				max: parseInt(rangeValue.min + gap),
			})
		}

		setRangeTrackPercantageHandler()
	}

	const setRangeTrackPercantageHandler = () => {
		setRangeTrackPercantage({
			...rangeTrackPercantage,
			minPercentage: (rangeValue.min / maxValue) * 100,
			maxPercentage: (rangeValue.max / maxValue) * 100,
		})
	}

	return (
		<div className='filters-range'>
			<div className='filters-range__input'>
				<div className='filters-range__input-inputs'>
					<div
						className='filters-range__input-inputs_track'
						style={{
							background: `linear-gradient(to right, 
								#a5acbd ${rangeTrackPercantage.minPercentage}%, 
								#2889b9 ${rangeTrackPercantage.minPercentage}%, 
								#2889b9 ${rangeTrackPercantage.maxPercentage}%, 
								#a5acbd ${rangeTrackPercantage.maxPercentage}%)`,
						}}
					></div>
					<input
						type='range'
						name='min'
						min='0'
						max='1543000'
						value={rangeValue.min}
						onInput={setRangeValueHandler}
					/>
					<input
						type='range'
						name='max'
						min='0'
						max='1543000'
						value={rangeValue.max}
						onInput={setRangeValueHandler}
					/>
				</div>
				<div className='filters-range__input-values'>
					<span className='filters-range__input-values_min'>
						<span>от:</span>
						<span>{rangeValue.min}</span>
					</span>
					<span className='filters-range__input-values_max'>
						<span>до:</span>
						<span>{rangeValue.max}</span>
					</span>
				</div>
			</div>
		</div>
	)
}

export default FiltersRange
