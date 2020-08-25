import React from 'react'
import {connect} from 'react-redux'
import { Stack, Panel, PanelType , CommandBarButton, DefaultButton} from '@fluentui/react'
import './debugLogs.scss'

class DebugLogs extends React.PureComponent {

	constructor(props){
		super(props);
		this.state={
			isOpen : false,
			log : null
		}
	}

	render() {
		const debugData = this.props.logs.debugData
		return (
			<div>
				<div className={'debugTitle'}>
					<CommandBarButton
						disabled={!this.state.isOpen}
						onClick={()=>this.setState({isOpen:false})}
						iconProps={ { iconName: 'Cancel' }}
						text="Debug Logs"
          />
				</div>
				<Panel 
					className={'debugPanel'}
					//this subpanel goes above rightPanel
					layerProps={{ styles: { root: { zIndex: 999999 }}}}
					type={PanelType.medium}
					isOpen={this.state.isOpen}
					hasCloseButton={false}
				>
				 {this.state.log && <div
				 dangerouslySetInnerHTML={{__html: this.state.log.debugHtml}}></div> }
				</Panel>
				<Stack>
				{debugData && debugData.length > 0 ?
					debugData.map((log, index) => 
				  <Stack.Item key={index}>
						<DefaultButton 
						  iconProps={ { iconName: 'ChevronLeft' }}
							className={'logItem'}
							onClick={()=>{this.setState({isOpen:true,log:log})}}>
							{log.sasProgram}
						</DefaultButton>
					</Stack.Item>
					)
					: 
					<h4 className={'text-center text-danger'}> Debug List is empty!</h4>}
					</Stack>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		logs: state.adapter.logs
	}
}

export default connect(mapStateToProps)(DebugLogs)
