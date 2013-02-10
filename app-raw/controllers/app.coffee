class App extends Spine.Controller

	count: 0
	start: 0
	amount: 50
	PER_PAGE: 15
	pageCount: 1
	jsonCallback: ""

	debug:
		active: true
		color: "color:white; background-color:black"
		name: "APP"

	MIN_WIDTH: 200 #270
	MAX_WIDTH: 200 #500
	COLUMN_WIDTH: 200 #270
	GAP: 5

	SCROLL_OFFSET: 1600

	currentPlayer: "bernatfortet"

	isLoading: false

	state:
		all 	:"all"
		author 	:"author"
		tag 	:"tag"
		single 	:"single"

	currentState: "all"

	elements:
		"#Shots": "ShotsDiv"

	constructor: ->
		super
		console.log("App Controller initialised" )
		

		this.fetchPlayerLikes( this.currentPlayer )
		this.layout()
		
		$(document).scroll( this.checkScrolling )

	# Setup Masonry Grid  =====================
	layout: ->
		this.ShotsDiv.masonry
			itemSelector: '.Shot'
			columnWidth: this.COLUMN_WIDTH
			gutterWidth: this.GAP
			isResizable: true
			isFitWidth: true

	setColumnWidth: ->
		width = this.ShotsDiv.width()
		columns = Math.floor( width / this.MIN_WIDTH )
		newWidth = columns * this.MIN_WIDTH + this.GAP * (columns - 1)
		extraSpace = width - newWidth
		#this.ShotsDiv.width( newWidth )

		this.COLUMN_WIDTH =
			if this.MIN_WIDTH + ( extraSpace / columns - this.GAP * (columns - 1)) >= this.MIN_WIDTH
			else this.MIN_WIDTH

	# Events =====================
	checkScrolling: =>
		bottomPos = this.ShotsDiv.outerHeight()
		scrollPos = $(window).scrollTop()

		if( scrollPos + $(window).height() * 3 >= bottomPos && !this.isLoading )
			console.log( "fectich more likes after scrol");
			this.fetchPlayerLikes( this.currentPlayer)
			this.checkScrolling()

	# Shot Creation, Model + Controller + Render =====================
	createShots: ( shots ) ->
		console.log( shots );
		this.createShot(shot) for shot in shots
		this.isLoading = false

	createShot:( shot ) ->
		if( !Shot.exists( shot.id ) )
			shotModel = Shot.create( shot )
			shotController = new ShotsController( el: this.ShotsDiv, item: shotModel )


	# After Fetched & Created, only Controller + Render =====================
	renderShots: ( shots ) ->
		console.log( shots );
		this.renderShot(shot) for shot in shots

	renderShot: ( shot ) ->
		new ShotsController( el: this.ShotsDiv, item: shot )


	# Clean Shots page
	cleanShotss: ->
		this.ShotsDiv.masonry( 'remove', this.ShotsDiv.children() )
			.masonry( 'reload' )


	# Ajax Fetching via Tubmlr API =====================
	fetchPlayerLikes: ( playerId ) ->
		console.log( "Loading Page: #{this.pageCount} ");
		$.jribbble.getShotsThatPlayerLikes(
			"bernatfortet",
			( data ) =>
				this.createShots( data.shots )
				this.checkScrolling()
			{
				page: this.pageCount,
				per_page: this.PER_PAGE
			}
		)
		this.isLoading = true
		this.pageCount++
