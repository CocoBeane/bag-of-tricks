/*This file contains all of the individual functions that interact with the DOM.*/ 

//DE FUNCTIONS

	//Attach most recent buckets to all active options ***DEPRECATED**
	/* attachBuckets = function() {

		if (!$("#deal_use_merchant_specific_voucher_codes").is(":checked")){
			$("#deal_use_merchant_specific_voucher_codes").attr("checked","checked");
		}

		var numberOfOptions = 0;
		var bucketNumber = 1;

		function alertReminder(){
			alert("Please remember to double-check your buckets!");
		}

		function setBuckets(callback){
			$(".module-body").each(function(){
				if ($("#deal_options_attributes_"+numberOfOptions+"_status_active").is(":checked")){

					$("#deal_options_attributes_"+numberOfOptions+"_voucher_barcode_bucket_id option:eq("+bucketNumber+")").attr("selected", "selected");
				
					if ($("#deal_options_attributes_"+numberOfOptions+"_voucher_barcode_bucket_id").val() != ""){
						var inventoryStrategy = $("#deal_options_attributes_"+numberOfOptions+"_voucher_barcode_bucket_id option:selected").attr("data-inventory-strategy");
						$("#deal_options_attributes_"+numberOfOptions+"_inventory_strategy").val(inventoryStrategy);
					}

					bucketNumber++
				}
				numberOfOptions++
			});

			callback();
		}

		setBuckets(function(){
			alertReminder();
		});
	} 

	//Attach only the top bucket to all options ***DEPRECATED**
	attachTopBucket = function() {

		if (!$("#deal_use_merchant_specific_voucher_codes").is(":checked")){
			$("#deal_use_merchant_specific_voucher_codes").attr("checked","checked");
		}

		var numberOfOptions = 0;

		$(".module-body").each(function(){
			if ($("#deal_options_attributes_"+numberOfOptions+"_status_active").is(":checked")){

				$("#deal_options_attributes_"+numberOfOptions+"_voucher_barcode_bucket_id option:eq(1)").attr("selected", "selected");
				
				if ($("#deal_options_attributes_"+numberOfOptions+"_voucher_barcode_bucket_id").val() != ""){
					var inventory_strategy = $("#deal_options_attributes_"+numberOfOptions+"_voucher_barcode_bucket_id option:selected").attr("data-inventory-strategy");
					$("#deal_options_attributes_"+numberOfOptions+"_inventory_strategy").val(inventory_strategy);
				}
			}
			numberOfOptions++
		});
	}	

	//Find this bucket in the PWA ***DEPRECATED**
	findBucket = function() {
		var number_of_options = 0;

		$(".module-top").each(function(){
			if ($(this).parent().hasClass("open")){

				var edit_bucket_codes_link = $(this).next().find(".manage-barcode-buckets").attr("href");
				var total_buckets = $("#deal_options_attributes_"+number_of_options+"_voucher_barcode_bucket_id").children("option").length - 1;
				var this_bucket_index = $("#deal_options_attributes_"+number_of_options+"_voucher_barcode_bucket_id option:selected").index();
				var page_number = Math.ceil(this_bucket_index / 5);

				var link = edit_bucket_codes_link+"?page="+page_number;
				window.open(link, '_blank');
			}
			number_of_options++
		});
	} */

	//Open all active options
	openActiveOptions = function() {
		var number_of_options = 0;

		$(".module-top").each(function(){
			if (!$(this).parent().hasClass("open") && $("#deal_options_attributes_"+number_of_options+"_status_active").is(":checked")){
				$(this).click();
			}
			number_of_options++
		});
	}	

	//Open all options
	openOptions = function() {
		$(".module-top").click();
	}

	//Widen option pods
	widenOptions = function() {
		$(".options").css("width", "800px"); 
		$(".option_title").css("width", "800px");
	}


//NAVIGATION
	
	//Go to existing ticket(s)
	openTicket = function() {
		var SRCIFieldContents = jQuery("#00NC0000005LsPu_ileinner").html();
		var tickets = [];

		if (SRCIFieldContents.match("#+")){

			while (SRCIFieldContents.match("#+") != null){
				var isolatedNumber = SRCIFieldContents.match("[#]{1}[0-9]+");
				var SRCIFieldContents = SRCIFieldContents.replace(isolatedNumber, "");
				var ticketNumber = String(isolatedNumber).substring(1);
				tickets.push(ticketNumber);
			}

			var zendeskTicketURL = "https://grouhelpon.zendesk.com/agent/tickets/";

				for (var i=0; i < tickets.length; i++) {
					var link = zendeskTicketURL+tickets[i];
					window.open(link, '_blank');
				}

		} else {
			alert("Sorry, can't find a ticket for this one!");
		}
	}

	//Search for ticket
	searchForTickets = function() {
		var current_url = window.location.href;
		var current_sfid = current_url.split("/")[3];
  		var prompt = window.prompt("Here's the SFID. Copy it to your clipboard.\n Then, a Zendesk window will open for you to paste it into.", current_sfid);

  		if (prompt) {
			var zendesk_search_url = "https://grouhelpon.zendesk.com/agent/search?query=";
			window.open(zendesk_search_url, '_blank');
		}
	}

	//ETC

	//Create code files for Travel by Jen deals
	generateTBJFiles = function() {
		$("#generate_redemption_codes_code_type").val("alphanumeric");
		$("#generate_redemption_codes_length").val("10");
		$("#generate_redemption_codes_ambiguous").removeAttr("checked");

		if ($("#generate_redemption_codes_filename2").val() == ''){
			var count = 1;
			$(".redemption_codes_filename").each(function(){
				$(this).val(count);
				count++;
			});
		} else if ($("#generate_redemption_codes_filename1").val() != "" ){
				$(".redemption_codes_filename").each(function(){

				var name = $(this).val();
				var name = parseInt(name);
				var name = name + 10;

				$(this).val(name);
			});
		}
		
		if ($("#generate_redemption_codes_filename1_count").val() == "1"){
			$(".code_count").each(function(){
				$(this).val(50);
			});
		}
		
		$("#generate_redemption_codes_filename1_count").keyup(function(){
			var amount = $("#generate_redemption_codes_filename1_count").val();
			$(".code_count").each(function(){
				$(this).val(amount);
			});
		});

		$("#generate_redemption_codes_filename1_prefix").keyup(function(){

			if ($("#generate_redemption_codes_filename1_prefix").val() != ""){
			
				$("#generate_redemption_codes_filename1_prefix").keyup(function(){
					var prefix = $("#generate_redemption_codes_filename1_prefix").val();
					$(".prefix").each(function(){
						$(this).val(prefix);
					});
				});
			}
		})

		$("#generate_redemption_codes_filename10_count").keyup();
	}



