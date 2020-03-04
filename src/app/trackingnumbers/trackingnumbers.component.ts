import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-trackingnumbers',
  templateUrl: './trackingnumbers.component.html',
  styleUrls: ['./trackingnumbers.component.css']
})
export class TrackingnumbersComponent implements OnInit {

  public userData:any = {};
  loaderStart = false;
  submitted = false;
  formSubmitted = false;
  TRACKING_NUMBER_LIST = [];


  orderResp = {
    "objects": [
      {
        "id": 1024,
        "user_id": 16,
        "time": "2019-07-25 18:39:39",
        "local_order_id": [
          "GEN16792341564060179",
          "GEN16910011564060269"
        ],
        "order_data": {
          "products": [
            {
              "quantity": 1,
              "retailer": "Fashion Nova",
              "product_id": "31827",
              "product_name": "",
              "product_offerType": ""
            }
          ],
          "cart_data": [
            {
              "url": "https://www.fashionnova.com/products/awaiikin-face-mask-honey?variant=12193423097980",
              "size": "OS",
              "color": "One Color",
              "quantity": 1,
              "product_sku": "87645",
              "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-honey?variant=12193423097980",
              "product_code": "",
              "product_name": "Awaiikin Face Mask - Honey",
              "product_size": "OS",
              "variation_id": "18cbf6c2-7689-4c26-99ad-18edd12ca785",
              "product_color": "One Color",
              "product_image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-14-32_AKM2034_Mustard_04220422_AG.jpg?v=1552429314",
              "product_price": "1.99",
              "retailer_logo": "https://luau-docker-3.s3.amazonaws.com/images/retailer_images/fashionnova.com.png",
              "product_seller": "",
              "product_retailer": "Fashion Nova",
              "product_shipping_price": "6.0"
            }
          ],
          "max_price": 9999,
          "is_failure": false,
          "user_email": "a@a.com",
          "animal_value": 0,
          "payment_method": {
            "number": "42424XXXXXXX4242",
            "use_gift": false,
            "name_on_card": "Stripe Test Card"
          },
          "billing_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+14567894561",
            "address_line1": "sss",
            "address_line2": ""
          },
          "shipping_method": "cheapest",
          "zinc_amazon_tax": "0.45",
          "shipping_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+16093757655",
            "address_line1": "sss",
            "address_line2": ""
          },
          "grand_total_price": "8.45",
          "retailer_credentials": {
            "email": "russellin49@gmail.com",
            "password": "Ammonium12%",
            "verification_code": ""
          },
          "zinc_amazon_shipping": "6"
        },
        "order_placed_by": "fashion nova",
        "order_placement_status": [
          1,
          1
        ],
        "timestamp": "4 weeks ago",
        "order_status": "Successful",
        "status_msg": "Invalid source object: must be a dictionary or a non-empty string. See API docs at https://stripe.com/docs'",
        "retailer_logo": "https://luau-docker-3.s3.amazonaws.com/images/retailer_images/fashionnova.com.png",
        "order_details": {
          "shipping_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+16093757655",
            "address_line1": "sss",
            "address_line2": ""
          },
          "payment_method": {
            "number": "42424XXXXXXX4242",
            "use_gift": false,
            "name_on_card": "Stripe Test Card"
          },
          "order_grand_total": "8.45",
          "user_email": "a@a.com",
          "username": "Mayank"
        },
        "product_details": [
          {
            "id": 1024,
            "user_id": 16,
            "local_order_id": "GEN16910011564060269",
            "name": "Awaiikin Face Mask - Rose",
            "size": "OS",
            "color": "One Color",
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-16-05_AKM2036_Pink_04250425_AG.jpg?v=1552429436",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-rose?variant=12193418936444",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Rose": {
                  "messages": [],
                  "carrier": "shippo",
                  "tracking_number": "SHIPPO_DELIVERED",
                  "address_from": {
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94103",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611",
                    "country": "US"
                  },
                  "eta": "2019-07-15T10:48:40.867Z",
                  "original_eta": "2019-07-14T10:48:40.867Z",
                  "servicelevel": {
                    "token": "shippo_priority",
                    "name": "Priority Mail"
                  },
                  "metadata": "Shippo test tracking",
                  "tracking_status": {
                    "object_created": "2019-07-16T10:48:40.885Z",
                    "object_updated": null,
                    "object_id": "e6828f9385da4bf6ae33ab36a72a47b0",
                    "status": "DELIVERED",
                    "status_details": "Your shipment has been delivered.",
                    "status_date": "2019-07-15T08:43:40.885Z",
                    "substatus": null,
                    "location": {
                      "city": "Chicago",
                      "state": "IL",
                      "zip": "60611",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "8203c1099fbc4dedab8ee6ed402266f8",
                      "status": "UNKNOWN",
                      "status_details": "The carrier has received the electronic shipment information.",
                      "status_date": "2019-07-12T02:28:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "939079325d624e5991991ec5b341e02f",
                      "status": "TRANSIT",
                      "status_details": "Your shipment has departed from the origin.",
                      "status_date": "2019-07-13T04:33:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "40d837ba4e1a433b8b84731fe54e736b",
                      "status": "FAILURE",
                      "status_details": "The Postal Service has identified a problem with the processing of this item and you should contact support to get further information.",
                      "status_date": "2019-07-14T06:38:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "37501",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "0eae640c503c46febd4faf6576c7f0af",
                      "status": "DELIVERED",
                      "status_details": "Your shipment has been delivered.",
                      "status_date": "2019-07-15T08:43:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Chicago",
                        "state": "IL",
                        "zip": "60611",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": true
                }
              }
            },
            "money_differential": 5.46,
            "order_status": 1,
          },
          {
            "id": 1025,
            "user_id": 16,
            "local_order_id": "GEN16910011564060270",
            "name": "Awaiikin Face Mask - Honey",
            "size": "OS",
            "color": "One Color",          
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-14-32_AKM2034_Mustard_04220422_AG.jpg?v=1552429314",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-honey?variant=12193423097980",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Honey": {
                  "messages": [],
                  "carrier": "fedex",
                  "tracking_number": "477623592346",
                  "address_from": {
                    "city": "Memphis",
                    "state": "TN",
                    "zip": "",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "West Windsor",
                    "state": "NJ",
                    "zip": "",
                    "country": "US"
                  },
                  "eta": "2018-12-20T17:00:49Z",
                  "original_eta": "2018-12-20T17:00:49Z",
                  "servicelevel": {
                    "token": "fedex_home_delivery",
                    "name": "Home Delivery®"
                  },
                  "metadata": "803",
                  "tracking_status": {
                    "object_created": "2019-03-29T07:54:03.243Z",
                    "object_updated": "2019-03-29T07:54:03.243Z",
                    "object_id": "b575c3d0332042ffac270c67b54327bd",
                    "status": "TRANSIT",
                    "status_details": "Delivered",
                    "status_date": "2018-12-20T17:00:49Z",
                    "substatus": {
                      "code": "out_for_delivery",
                      "text": "Package has been delivered.",
                      "action_required": false
                    },
                    "location": {
                      "city": "Princeton Junction",
                      "state": "NJ",
                      "zip": "08550",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "abd99e49b0974c17bf73580cffdc415a",
                      "status": "PRE_TRANSIT",
                      "status_details": "Shipment information sent to FedEx",
                      "status_date": "2018-12-18T06:08:00Z",
                      "substatus": {
                        "code": "information_received",
                        "text": "Information about the package received.",
                        "action_required": false
                      },
                      "location": {
                        "city": "",
                        "state": "",
                        "zip": "381187533",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "ec043f3dfb4849428110ad5b3009bc60",
                      "status": "TRANSIT",
                      "status_details": "Picked up",
                      "status_date": "2018-12-18T17:38:00Z",
                      "substatus": {
                        "code": "package_accepted",
                        "text": "Package has been accepted into the carrier network for delivery.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "38106",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "a28d20a2ba3544b6b3e953d1494918d4",
                      "status": "TRANSIT",
                      "status_details": "Arrived at FedEx location",
                      "status_date": "2018-12-18T21:06:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "38106",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "22a51b6b07184db6869aba9d56696451",
                      "status": "TRANSIT",
                      "status_details": "Departed FedEx location",
                      "status_date": "2018-12-19T09:21:53Z",
                      "substatus": {
                        "code": "package_departed",
                        "text": "Package has departed from an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "38106",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "d080874eb96b4888bd888639c5aad430",
                      "status": "TRANSIT",
                      "status_details": "In transit",
                      "status_date": "2018-12-19T21:22:59Z",
                      "substatus": {
                        "code": "package_departed",
                        "text": "Package has departed from an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Troutville",
                        "state": "VA",
                        "zip": "24175",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "4f54923abebf40098ee6a1a1311aeeb0",
                      "status": "TRANSIT",
                      "status_details": "Arrived at FedEx location",
                      "status_date": "2018-12-20T05:06:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Middletown",
                        "state": "PA",
                        "zip": "17057",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "25f95b0a4c5b47cd8f512fff106b9865",
                      "status": "TRANSIT",
                      "status_details": "Departed FedEx location",
                      "status_date": "2018-12-20T06:23:20Z",
                      "substatus": {
                        "code": "package_departed",
                        "text": "Package has departed from an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Middletown",
                        "state": "PA",
                        "zip": "17057",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "4a613d8a05cf498a9c69d85a20c04aeb",
                      "status": "TRANSIT",
                      "status_details": "Arrived at FedEx location",
                      "status_date": "2018-12-20T11:24:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Dayton",
                        "state": "NJ",
                        "zip": "08810",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "8121cfaf18a945f79d76996a5de25762",
                      "status": "TRANSIT",
                      "status_details": "At local FedEx facility",
                      "status_date": "2018-12-20T11:27:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Dayton",
                        "state": "NJ",
                        "zip": "08810",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "ff888379bbf2436195dc36668749df34",
                      "status": "TRANSIT",
                      "status_details": "On FedEx vehicle for delivery",
                      "status_date": "2018-12-20T11:32:00Z",
                      "substatus": {
                        "code": "out_for_delivery",
                        "text": "Package is out for delivery.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Dayton",
                        "state": "NJ",
                        "zip": "08810",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "a5046d12e05a43339c462ba452bb20e0",
                      "status": "DELIVERED",
                      "status_details": "Delivered",
                      "status_date": "2018-12-20T17:00:49Z",
                      "substatus": {
                        "code": "delivered",
                        "text": "Package has been delivered.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Princeton Junction",
                        "state": "NJ",
                        "zip": "08550",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": false
                }
              }
            },
            "money_differential": 6.46,
            "order_status": 2,
          },
          {
            "id": 1024,
            "user_id": 16,
            "local_order_id": "GEN16910011564060269",
            "name": "Awaiikin Face Mask - Rose",
            "size": "OS",
            "color": "One Color",
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-16-05_AKM2036_Pink_04250425_AG.jpg?v=1552429436",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-rose?variant=12193418936444",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Rose": {
                  "messages": [],
                  "carrier": "shippo",
                  "tracking_number": "SHIPPO_DELIVERED",
                  "address_from": {
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94103",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611",
                    "country": "US"
                  },
                  "eta": "2019-07-15T10:48:40.867Z",
                  "original_eta": "2019-07-14T10:48:40.867Z",
                  "servicelevel": {
                    "token": "shippo_priority",
                    "name": "Priority Mail"
                  },
                  "metadata": "Shippo test tracking",
                  "tracking_status": {
                    "object_created": "2019-07-16T10:48:40.885Z",
                    "object_updated": null,
                    "object_id": "e6828f9385da4bf6ae33ab36a72a47b0",
                    "status": "DELIVERED",
                    "status_details": "Your shipment has been delivered.",
                    "status_date": "2019-07-15T08:43:40.885Z",
                    "substatus": null,
                    "location": {
                      "city": "Chicago",
                      "state": "IL",
                      "zip": "60611",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "8203c1099fbc4dedab8ee6ed402266f8",
                      "status": "UNKNOWN",
                      "status_details": "The carrier has received the electronic shipment information.",
                      "status_date": "2019-07-12T02:28:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "939079325d624e5991991ec5b341e02f",
                      "status": "TRANSIT",
                      "status_details": "Your shipment has departed from the origin.",
                      "status_date": "2019-07-13T04:33:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "40d837ba4e1a433b8b84731fe54e736b",
                      "status": "FAILURE",
                      "status_details": "The Postal Service has identified a problem with the processing of this item and you should contact support to get further information.",
                      "status_date": "2019-07-14T06:38:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "37501",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "0eae640c503c46febd4faf6576c7f0af",
                      "status": "DELIVERED",
                      "status_details": "Your shipment has been delivered.",
                      "status_date": "2019-07-15T08:43:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Chicago",
                        "state": "IL",
                        "zip": "60611",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": true
                }
              }
            },
            "money_differential": 5.46,
            "order_status": 3,
          },
          {
            "id": 1025,
            "user_id": 16,
            "local_order_id": "GEN16910011564060270",
            "name": "Awaiikin Face Mask - Honey",
            "size": "OS",
            "color": "One Color",          
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-14-32_AKM2034_Mustard_04220422_AG.jpg?v=1552429314",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-honey?variant=12193423097980",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Honey": {
                  "messages": [],
                  "carrier": "fedex",
                  "tracking_number": "477623592346",
                  "address_from": {
                    "city": "Memphis",
                    "state": "TN",
                    "zip": "",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "West Windsor",
                    "state": "NJ",
                    "zip": "",
                    "country": "US"
                  },
                  "eta": "2018-12-20T17:00:49Z",
                  "original_eta": "2018-12-20T17:00:49Z",
                  "servicelevel": {
                    "token": "fedex_home_delivery",
                    "name": "Home Delivery®"
                  },
                  "metadata": "803",
                  "tracking_status": {
                    "object_created": "2019-03-29T07:54:03.243Z",
                    "object_updated": "2019-03-29T07:54:03.243Z",
                    "object_id": "b575c3d0332042ffac270c67b54327bd",
                    "status": "TRANSIT",
                    "status_details": "Delivered",
                    "status_date": "2018-12-20T17:00:49Z",
                    "substatus": {
                      "code": "out_for_delivery",
                      "text": "Package has been delivered.",
                      "action_required": false
                    },
                    "location": {
                      "city": "Princeton Junction",
                      "state": "NJ",
                      "zip": "08550",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "abd99e49b0974c17bf73580cffdc415a",
                      "status": "PRE_TRANSIT",
                      "status_details": "Shipment information sent to FedEx",
                      "status_date": "2018-12-18T06:08:00Z",
                      "substatus": {
                        "code": "information_received",
                        "text": "Information about the package received.",
                        "action_required": false
                      },
                      "location": {
                        "city": "",
                        "state": "",
                        "zip": "381187533",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "ec043f3dfb4849428110ad5b3009bc60",
                      "status": "TRANSIT",
                      "status_details": "Picked up",
                      "status_date": "2018-12-18T17:38:00Z",
                      "substatus": {
                        "code": "package_accepted",
                        "text": "Package has been accepted into the carrier network for delivery.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "38106",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "a28d20a2ba3544b6b3e953d1494918d4",
                      "status": "TRANSIT",
                      "status_details": "Arrived at FedEx location",
                      "status_date": "2018-12-18T21:06:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "38106",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "22a51b6b07184db6869aba9d56696451",
                      "status": "TRANSIT",
                      "status_details": "Departed FedEx location",
                      "status_date": "2018-12-19T09:21:53Z",
                      "substatus": {
                        "code": "package_departed",
                        "text": "Package has departed from an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "38106",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "d080874eb96b4888bd888639c5aad430",
                      "status": "TRANSIT",
                      "status_details": "In transit",
                      "status_date": "2018-12-19T21:22:59Z",
                      "substatus": {
                        "code": "package_departed",
                        "text": "Package has departed from an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Troutville",
                        "state": "VA",
                        "zip": "24175",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "4f54923abebf40098ee6a1a1311aeeb0",
                      "status": "TRANSIT",
                      "status_details": "Arrived at FedEx location",
                      "status_date": "2018-12-20T05:06:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Middletown",
                        "state": "PA",
                        "zip": "17057",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "25f95b0a4c5b47cd8f512fff106b9865",
                      "status": "TRANSIT",
                      "status_details": "Departed FedEx location",
                      "status_date": "2018-12-20T06:23:20Z",
                      "substatus": {
                        "code": "package_departed",
                        "text": "Package has departed from an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Middletown",
                        "state": "PA",
                        "zip": "17057",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "4a613d8a05cf498a9c69d85a20c04aeb",
                      "status": "TRANSIT",
                      "status_details": "Arrived at FedEx location",
                      "status_date": "2018-12-20T11:24:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Dayton",
                        "state": "NJ",
                        "zip": "08810",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "8121cfaf18a945f79d76996a5de25762",
                      "status": "TRANSIT",
                      "status_details": "At local FedEx facility",
                      "status_date": "2018-12-20T11:27:00Z",
                      "substatus": {
                        "code": "package_arrived",
                        "text": "Package has arrived at an intermediate location in the carrier network.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Dayton",
                        "state": "NJ",
                        "zip": "08810",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "ff888379bbf2436195dc36668749df34",
                      "status": "TRANSIT",
                      "status_details": "On FedEx vehicle for delivery",
                      "status_date": "2018-12-20T11:32:00Z",
                      "substatus": {
                        "code": "out_for_delivery",
                        "text": "Package is out for delivery.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Dayton",
                        "state": "NJ",
                        "zip": "08810",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-03-29T07:54:03.243Z",
                      "object_updated": "2019-03-29T07:54:03.243Z",
                      "object_id": "a5046d12e05a43339c462ba452bb20e0",
                      "status": "DELIVERED",
                      "status_details": "Delivered",
                      "status_date": "2018-12-20T17:00:49Z",
                      "substatus": {
                        "code": "delivered",
                        "text": "Package has been delivered.",
                        "action_required": false
                      },
                      "location": {
                        "city": "Princeton Junction",
                        "state": "NJ",
                        "zip": "08550",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": false
                }
              }
            },
            "money_differential": 6.46,
            "order_status": 2,
          },
          {
            "id": 1024,
            "user_id": 16,
            "local_order_id": "GEN16910011564060269",
            "name": "Awaiikin Face Mask - Rose",
            "size": "OS",
            "color": "One Color",
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-16-05_AKM2036_Pink_04250425_AG.jpg?v=1552429436",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-rose?variant=12193418936444",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Rose": {
                  "messages": [],
                  "carrier": "shippo",
                  "tracking_number": "SHIPPO_DELIVERED",
                  "address_from": {
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94103",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611",
                    "country": "US"
                  },
                  "eta": "2019-07-15T10:48:40.867Z",
                  "original_eta": "2019-07-14T10:48:40.867Z",
                  "servicelevel": {
                    "token": "shippo_priority",
                    "name": "Priority Mail"
                  },
                  "metadata": "Shippo test tracking",
                  "tracking_status": {
                    "object_created": "2019-07-16T10:48:40.885Z",
                    "object_updated": null,
                    "object_id": "e6828f9385da4bf6ae33ab36a72a47b0",
                    "status": "DELIVERED",
                    "status_details": "Your shipment has been delivered.",
                    "status_date": "2019-07-15T08:43:40.885Z",
                    "substatus": null,
                    "location": {
                      "city": "Chicago",
                      "state": "IL",
                      "zip": "60611",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "8203c1099fbc4dedab8ee6ed402266f8",
                      "status": "UNKNOWN",
                      "status_details": "The carrier has received the electronic shipment information.",
                      "status_date": "2019-07-12T02:28:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "939079325d624e5991991ec5b341e02f",
                      "status": "TRANSIT",
                      "status_details": "Your shipment has departed from the origin.",
                      "status_date": "2019-07-13T04:33:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "40d837ba4e1a433b8b84731fe54e736b",
                      "status": "FAILURE",
                      "status_details": "The Postal Service has identified a problem with the processing of this item and you should contact support to get further information.",
                      "status_date": "2019-07-14T06:38:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "37501",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "0eae640c503c46febd4faf6576c7f0af",
                      "status": "DELIVERED",
                      "status_details": "Your shipment has been delivered.",
                      "status_date": "2019-07-15T08:43:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Chicago",
                        "state": "IL",
                        "zip": "60611",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": true
                }
              }
            },
            "money_differential": 5.46,
            "order_status": 3,
          },
          {
            "id": 1024,
            "user_id": 16,
            "local_order_id": "GEN16910011564060269",
            "name": "Awaiikin Face Mask - Rose",
            "size": "OS",
            "color": "One Color",
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-16-05_AKM2036_Pink_04250425_AG.jpg?v=1552429436",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-rose?variant=12193418936444",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Rose": {
                  "messages": [],
                  "carrier": "shippo",
                  "tracking_number": "SHIPPO_DELIVERED",
                  "address_from": {
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94103",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611",
                    "country": "US"
                  },
                  "eta": "2019-07-15T10:48:40.867Z",
                  "original_eta": "2019-07-14T10:48:40.867Z",
                  "servicelevel": {
                    "token": "shippo_priority",
                    "name": "Priority Mail"
                  },
                  "metadata": "Shippo test tracking",
                  "tracking_status": {
                    "object_created": "2019-07-16T10:48:40.885Z",
                    "object_updated": null,
                    "object_id": "e6828f9385da4bf6ae33ab36a72a47b0",
                    "status": "DELIVERED",
                    "status_details": "Your shipment has been delivered.",
                    "status_date": "2019-07-15T08:43:40.885Z",
                    "substatus": null,
                    "location": {
                      "city": "Chicago",
                      "state": "IL",
                      "zip": "60611",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "8203c1099fbc4dedab8ee6ed402266f8",
                      "status": "UNKNOWN",
                      "status_details": "The carrier has received the electronic shipment information.",
                      "status_date": "2019-07-12T02:28:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "939079325d624e5991991ec5b341e02f",
                      "status": "TRANSIT",
                      "status_details": "Your shipment has departed from the origin.",
                      "status_date": "2019-07-13T04:33:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "40d837ba4e1a433b8b84731fe54e736b",
                      "status": "FAILURE",
                      "status_details": "The Postal Service has identified a problem with the processing of this item and you should contact support to get further information.",
                      "status_date": "2019-07-14T06:38:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "37501",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "0eae640c503c46febd4faf6576c7f0af",
                      "status": "DELIVERED",
                      "status_details": "Your shipment has been delivered.",
                      "status_date": "2019-07-15T08:43:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Chicago",
                        "state": "IL",
                        "zip": "60611",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": true
                }
              }
            },
            "money_differential": 5.46,
            "order_status": 3,
          },
          {
            "id": 1024,
            "user_id": 16,
            "local_order_id": "GEN16910011564060269",
            "name": "Awaiikin Face Mask - Rose",
            "size": "OS",
            "color": "One Color",
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-16-05_AKM2036_Pink_04250425_AG.jpg?v=1552429436",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-rose?variant=12193418936444",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Rose": {
                  "messages": [],
                  "carrier": "shippo",
                  "tracking_number": "SHIPPO_DELIVERED",
                  "address_from": {
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94103",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611",
                    "country": "US"
                  },
                  "eta": "2019-07-15T10:48:40.867Z",
                  "original_eta": "2019-07-14T10:48:40.867Z",
                  "servicelevel": {
                    "token": "shippo_priority",
                    "name": "Priority Mail"
                  },
                  "metadata": "Shippo test tracking",
                  "tracking_status": {
                    "object_created": "2019-07-16T10:48:40.885Z",
                    "object_updated": null,
                    "object_id": "e6828f9385da4bf6ae33ab36a72a47b0",
                    "status": "DELIVERED",
                    "status_details": "Your shipment has been delivered.",
                    "status_date": "2019-07-15T08:43:40.885Z",
                    "substatus": null,
                    "location": {
                      "city": "Chicago",
                      "state": "IL",
                      "zip": "60611",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "8203c1099fbc4dedab8ee6ed402266f8",
                      "status": "UNKNOWN",
                      "status_details": "The carrier has received the electronic shipment information.",
                      "status_date": "2019-07-12T02:28:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "939079325d624e5991991ec5b341e02f",
                      "status": "TRANSIT",
                      "status_details": "Your shipment has departed from the origin.",
                      "status_date": "2019-07-13T04:33:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "40d837ba4e1a433b8b84731fe54e736b",
                      "status": "FAILURE",
                      "status_details": "The Postal Service has identified a problem with the processing of this item and you should contact support to get further information.",
                      "status_date": "2019-07-14T06:38:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "37501",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "0eae640c503c46febd4faf6576c7f0af",
                      "status": "DELIVERED",
                      "status_details": "Your shipment has been delivered.",
                      "status_date": "2019-07-15T08:43:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Chicago",
                        "state": "IL",
                        "zip": "60611",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": true
                }
              }
            },
            "money_differential": 5.46,
            "order_status": 3,
          },
          {
            "id": 1024,
            "user_id": 16,
            "local_order_id": "GEN16910011564060269",
            "name": "Awaiikin Face Mask - Rose",
            "size": "OS",
            "color": "One Color",
            "brand":"fashionnova.com",
            "image": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-11-19_Lightbox_AB_14-16-05_AKM2036_Pink_04250425_AG.jpg?v=1552429436",
            "product_url": "https://www.fashionnova.com/products/awaiikin-face-mask-rose?variant=12193418936444",
            "tracking_details": {
              "tracking_number": "9261299989083534810923",
              "tracking_url": "http://www.fedex.com/Tracking?tracknumbers=9261299989083534810923&amp;action=track",
              "tracking_data": {
                "Awaiikin Face Mask - Rose": {
                  "messages": [],
                  "carrier": "shippo",
                  "tracking_number": "SHIPPO_DELIVERED",
                  "address_from": {
                    "city": "San Francisco",
                    "state": "CA",
                    "zip": "94103",
                    "country": "US"
                  },
                  "address_to": {
                    "city": "Chicago",
                    "state": "IL",
                    "zip": "60611",
                    "country": "US"
                  },
                  "eta": "2019-07-15T10:48:40.867Z",
                  "original_eta": "2019-07-14T10:48:40.867Z",
                  "servicelevel": {
                    "token": "shippo_priority",
                    "name": "Priority Mail"
                  },
                  "metadata": "Shippo test tracking",
                  "tracking_status": {
                    "object_created": "2019-07-16T10:48:40.885Z",
                    "object_updated": null,
                    "object_id": "e6828f9385da4bf6ae33ab36a72a47b0",
                    "status": "DELIVERED",
                    "status_details": "Your shipment has been delivered.",
                    "status_date": "2019-07-15T08:43:40.885Z",
                    "substatus": null,
                    "location": {
                      "city": "Chicago",
                      "state": "IL",
                      "zip": "60611",
                      "country": "US"
                    }
                  },
                  "tracking_history": [
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "8203c1099fbc4dedab8ee6ed402266f8",
                      "status": "UNKNOWN",
                      "status_details": "The carrier has received the electronic shipment information.",
                      "status_date": "2019-07-12T02:28:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "939079325d624e5991991ec5b341e02f",
                      "status": "TRANSIT",
                      "status_details": "Your shipment has departed from the origin.",
                      "status_date": "2019-07-13T04:33:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "San Francisco",
                        "state": "CA",
                        "zip": "94103",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "40d837ba4e1a433b8b84731fe54e736b",
                      "status": "FAILURE",
                      "status_details": "The Postal Service has identified a problem with the processing of this item and you should contact support to get further information.",
                      "status_date": "2019-07-14T06:38:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Memphis",
                        "state": "TN",
                        "zip": "37501",
                        "country": "US"
                      }
                    },
                    {
                      "object_created": "2019-07-16T10:48:40.887Z",
                      "object_updated": null,
                      "object_id": "0eae640c503c46febd4faf6576c7f0af",
                      "status": "DELIVERED",
                      "status_details": "Your shipment has been delivered.",
                      "status_date": "2019-07-15T08:43:40.887Z",
                      "substatus": null,
                      "location": {
                        "city": "Chicago",
                        "state": "IL",
                        "zip": "60611",
                        "country": "US"
                      }
                    }
                  ],
                  "transaction": null,
                  "test": true
                }
              }
            },
            "money_differential": 5.46,
            "order_status": 3,
          },
        ]
      },
      {
        "id": 1023,
        "user_id": 16,
        "time": "2019-07-25 18:36:20",
        "local_order_id": [
          "GEN16951291564059980"
        ],
        "order_data": {
          "products": [
            {
              "quantity": 1,
              "retailer": "Nike",
              "product_id": "5467",
              "product_name": "",
              "product_offerType": ""
            }
          ],
          "cart_data": [
            {
              "url": "https://www.nike.com/t/jordan-jumpman-wristbands-V9GPOe/JKN01-101",
              "size": "ONE SIZE",
              "color": "White/Black",
              "quantity": 1,
              "product_sku": "",
              "product_url": "https://www.nike.com/t/jordan-jumpman-wristbands-V9GPOe/JKN01-101",
              "product_code": "",
              "product_name": "JORDAN JUMPMAN WRISTBAND",
              "product_size": "ONE SIZE",
              "variation_id": "450fb74c-8991-4a31-ba40-67bf4632bdec",
              "product_color": "White/Black",
              "product_image": "https://c.static-nike.com/a/images/t_default/l3aiqkt27yejk8m56mvv/jordan-jumpman-wristband-V9GPOe.jpg",
              "product_price": "7.97",
              "retailer_logo": "https://www.nike.com/Nike_Swoosh_Logo_Black_original.jpg",
              "product_seller": "Nike",
              "product_retailer": "Nike",
              "product_shipping_price": "8.0"
            }
          ],
          "max_price": 9999,
          "is_failure": true,
          "user_email": "a@a.com",
          "animal_value": 0,
          "payment_method": {
            "number": "42424XXXXXXX4242",
            "use_gift": false,
            "name_on_card": "Stripe Test Card"
          },
          "billing_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+14567894561",
            "address_line1": "sss",
            "address_line2": ""
          },
          "shipping_method": "cheapest",
          "zinc_amazon_tax": "0.9",
          "shipping_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+16093757655",
            "address_line1": "sss",
            "address_line2": ""
          },
          "grand_total_price": "16.90",
          "retailer_credentials": {
            "email": "russellin49@gmail.com",
            "password": "Ammonium12%",
            "verification_code": ""
          },
          "zinc_amazon_shipping": "8"
        },
        "order_placed_by": "nike",
        "order_placement_status": [
          null
        ],
        "timestamp": "4 weeks ago",
        "order_status": "Failed",
        "status_msg": "Invalid source object: must be a dictionary or a non-empty string. See API docs at https://stripe.com/docs'",
        "retailer_logo": "https://www.nike.com/Nike_Swoosh_Logo_Black_original.jpg",
        "order_details": {
          "shipping_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+16093757655",
            "address_line1": "sss",
            "address_line2": ""
          },
          "payment_method": {
            "number": "42424XXXXXXX4242",
            "use_gift": false,
            "name_on_card": "Stripe Test Card"
          },
          "order_grand_total": "16.90",
          "user_email": "a@a.com",
          "username": "MayankA"
        },
        "product_details": [
          {
            "name": "JORDAN JUMPMAN WRISTBAND",
            "size": "ONE SIZE",
            "color": "White/Black",
            "brand":"nike.com",
            "image": "https://c.static-nike.com/a/images/t_default/l3aiqkt27yejk8m56mvv/jordan-jumpman-wristband-V9GPOe.jpg",
            "product_url": "https://www.nike.com/t/jordan-jumpman-wristbands-V9GPOe/JKN01-101",
            "tracking_details": {
              "tracking_number": null,
              "tracking_url": "",
              "tracking_data": {
                "JORDAN JUMPMAN WRISTBAND": ""
              }
            },
            "money_differential": -4.20,
            "order_status": 1,
          }
        ]
      },
      {
        "id": 1022,
        "user_id": 16,
        "time": "2019-07-22 12:17:14",
        "local_order_id": [
          "GEN16200841563778034"
        ],
        "order_data": {
          "products": [
            {
              "quantity": 1,
              "retailer": "Ulta",
              "product_id": "25269",
              "product_name": "",
              "product_offerType": ""
            }
          ],
          "cart_data": [
            {
              "url": "https://www.ulta.com/moody-blue-nail-file?productId=xlsImpprod11511027",
              "size": "One Size",
              "color": "Moody Blue",
              "quantity": 1,
              "product_sku": "",
              "product_url": "https://www.ulta.com/moody-blue-nail-file?productId=xlsImpprod11511027",
              "product_code": "",
              "product_name": "Flowery Moody Blue Nail File | Ulta Beauty",
              "product_size": "One Size",
              "variation_id": "7aaef5e4-347c-49d2-a4fa-ce69c370ae4b",
              "product_color": "Moody Blue",
              "product_image": "https://images.ulta.com/is/image/Ulta/2105323?$detail$",
              "product_price": "1.99",
              "retailer_logo": "https://luau-docker-3.s3.amazonaws.com/images/retailer_images/ulta.com.png",
              "product_seller": "",
              "product_retailer": "Ulta",
              "product_shipping_price": "6.0"
            }
          ],
          "max_price": 9999,
          "is_failure": true,
          "user_email": "a@a.com",
          "animal_value": 0,
          "payment_method": {
            "number": "42424XXXXXXX4242",
            "use_gift": false,
            "name_on_card": "Stripe Test Card"
          },
          "billing_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+14567894561",
            "address_line1": "sss",
            "address_line2": ""
          },
          "shipping_method": "cheapest",
          "zinc_amazon_tax": "0.45",
          "shipping_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+16093757655",
            "address_line1": "sss",
            "address_line2": ""
          },
          "grand_total_price": "8.45",
          "retailer_credentials": {
            "email": "russellin49@gmail.com",
            "password": "Ammonium12%",
            "verification_code": ""
          },
          "zinc_amazon_shipping": "6"
        },
        "order_placed_by": "ulta",
        "order_placement_status": [
          null
        ],
        "timestamp": "1 month ago",
        "order_status": "Failed",
        "status_msg": "Invalid source object: must be a dictionary or a non-empty string. See API docs at https://stripe.com/docs'",
        "retailer_logo": "https://luau-docker-3.s3.amazonaws.com/images/retailer_images/ulta.com.png",
        "order_details": {
          "shipping_address": {
            "city": "ghh",
            "state": "Arizona",
            "country": "US",
            "zip_code": "12345",
            "last_name": "Agarwal",
            "first_name": "Mayank Agarwal",
            "phone_number": "+16093757655",
            "address_line1": "sss",
            "address_line2": ""
          },
          "payment_method": {
            "number": "42424XXXXXXX4242",
            "use_gift": false,
            "name_on_card": "Stripe Test Card"
          },
          "order_grand_total": "8.45",
          "user_email": "a@a.com",
          "username": "MayankA"
        },
        "product_details": [
          {
            "name": "Flowery Moody Blue Nail File | Ulta Beauty",
            "size": "One Size",
            "color": "Moody Blue",
            "brand":"ulta.com",
            "image": "https://images.ulta.com/is/image/Ulta/2105323?$detail$",
            "product_url": "https://www.ulta.com/moody-blue-nail-file?productId=xlsImpprod11511027",
            "tracking_details": {
              "tracking_number": null,
              "tracking_url": "",
              "tracking_data": {
                "Flowery Moody Blue Nail File | Ulta Beauty": ""
              }
            },
            "money_differential": 4.46,
            "order_status": 3,
          }
        ]
      }
    ],
    "order_count": "611",
    "pending_count": "20"
  }

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj")); 

    this.getTrackingNumberList();
  };

  onResize(event) {
    /* Calculate TagList section hieght */
    this.calculateCardHieght()
  };

  calculateCardHieght(){
    setTimeout(function(){ 
      let wh = window.innerHeight;
      let id2Ele = document.getElementById("id2");
      let id2Bound = id2Ele.getBoundingClientRect();
      let id2PosTop = id2Bound.top;
      let id2Ht = wh-id2PosTop;
      document.getElementById("id2").style.height = id2Ht+"px";
     }, 200);
  };

  getTrackingNumberList(){
    this.TRACKING_NUMBER_LIST = this.orderResp.objects;
    this.submitted = false;
    // this.loaderStart = true;
    let trackingNumberReqObj = {
      "page" : this.userData.userDetail.page || 0,
      "user_id": this.userData.userDetail.user_id || 1,
      "token": this.userData.userDetail.token,
      "apiExt"    : "luauet-get-categories-data.php",
    }
    // this.apiService.customPostApiCall(trackingNumberReqObj).then((res:any)=>{
    //   if(res){
    //     this.loaderStart = false;
    //     this.TRACKING_NUMBER_LIST = res.objects || [];
    //   }else{
    //     this.loaderStart = false;
    //   }
    // },
    // (error) => {});
    this.calculateCardHieght();
  };

}
