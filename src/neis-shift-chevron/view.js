

const renderchevron = value => (
	<div className='chevronBorder'>
		<div className='chevrondiv' style={{ background: 'linear-gradient(0deg, #18A085 ' + value.value + '%, rgb(219, 219, 219) ' + value.value + '% 100%)' }}>
			<span style={{ fontSize: '25px', display: 'inline-block', marginLeft: '40%', marginTop: '10%' }}>{value.label}</span>
			<span style={{ fontSize: '20px', display: 'inline-block', marginLeft: value.value>99?'28%':'33%', marginTop: '20%' }}>{value.value}%</span>
		</div>
	</div>

);

export default (state) => {

	const { shift } = state;
	return (
			<div className='mainDiv'>

				{shift.length ? (<div style={{ display: 'table-row' }}>{shift.map(ele => (renderchevron(ele)

				))}
				</div>
				) : null}
			</div>
	);
};