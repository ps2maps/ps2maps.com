# Loop thru continents
for continentId,continent of continents

	# Loop thru facility types
	for facilityType, facilities of window[continent.slug].facilities

		# Add only facility icons
		if facilityType in ['amp_station','tech_plant','bio_lab','interlink_facility']

			# Loop thru facilities
			for facilityId, facility of facilities

				# Generate HTML for facility marker icon
				html  = '<li data-id="' + facilityId + '"><svg viewBox="0 0 256 256" class="marker-icon ' + facilityType + ' ns">'
				html += '<rect><title>' + facility.name + '</title></rect>'
				html += $$('div#svg-sprites').find('#' + facilityType).html()
				html += '</svg></li>'

				# Add the html
				$$('div.continent.' + continent.slug + ' div.facility-icons ul').append(html)




