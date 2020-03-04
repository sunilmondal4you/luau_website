import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonService } from './../common.service';
import * as _underscore from 'underscore';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-featuredproducts',
  templateUrl: './featuredproducts.component.html',
  styleUrls: ['./featuredproducts.component.css']
})
export class FeaturedproductsComponent implements OnInit {

  public userData:any = {};
  loaderStart = false;
  submitted = false;
  formSubmitted = false;
  prodCreatePageView = false;

  PRODUCT_LIST = [
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
  ];

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService,
    private commonService: CommonService,
    private dialogRef: MatDialog,
  ) { }


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userObj")); 

    this.getCategoriesList();
  }

  onResize(event) {
    /* Calculate TagList section hieght */
    this.calculateCardHieght();
  };

  getCategoriesList(){
    this.submitted = false;
    // this.loaderStart = true;
    let categoriesReqObj = {
      "page" : this.userData.userDetail.page || 0,
      "user_id": this.userData.userDetail.user_id || 1,
      "token": this.userData.userDetail.token,
      "apiExt"    : "luauet-get-categories-data.php",
    }
    // this.apiService.customPostApiCall(categoriesReqObj).then((res:any)=>{
    //   if(res){
    //     this.loaderStart = false;
    //     this.PRODUCT_LIST = res.objects || [];
    //   }else{
    //     this.loaderStart = false;
    //   }
    // },
    // (error) => {});

    this.calculateCardHieght()
  };

  calculateCardHieght(){
    setTimeout(function(){ 
      let wh = window.innerHeight;
      let id2Ele = document.getElementById("tableId");
      let id2Bound = id2Ele.getBoundingClientRect();
      let id2PosTop = id2Bound.top;
      let id2Ht = wh-id2PosTop;
      document.getElementById("tableId").style.height = id2Ht+"px";
     }, 200);
  };

  createUpdateProduct(){
    this.prodCreatePageView =! this.prodCreatePageView
  }

}
