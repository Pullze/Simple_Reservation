package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.vo.PropertyInfo;
import com.cs4400.service_backend.vo.ReserveInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = "Property Controller")
@RestController
public class PropertyController {

    @Autowired
    private PropertyProcess propertyProcess;

    /**
     * Get all properties.
     * @param high higher bound of capacity.
     * @param low lower bound of capacity.
     * @return a list of property as require.
     */
    @GetMapping(value = "/properties")
    @ApiOperation(value = "view Properties", notes = "view properties.")
    public Response<?> properties(@RequestParam(required = false) Integer high,@RequestParam(required = false) Integer low) {
        if (high == null) {
            high = Integer.MAX_VALUE;
        }

        if (low == null) {
            low = 0;
        }
        List<Property> result = propertyProcess.viewProperties(high, low);
        System.out.println(result);

        return new Response<>(HttpStatus.OK.value(), "", result);
    }

    /**
     * view Available properties
     * @param start start date in the filter
     * @param end end date in the filter
     * @return list of available properties.
     */
    @GetMapping(value = "/available_properties")
    @ApiOperation(value = "available Properties", notes = "available Properties")
    public List<Property> availableProperties(@RequestParam String start, @RequestParam String end) {
        List<Property> result = propertyProcess.viewAvailableProperties(start, end);
        System.out.println(result);
        return result;
    }

    /**
     * reserve a property
     * @param reserve reservation object
     * @return result
     */
    @PostMapping(value = "/reserve_property")
    @ApiOperation(value = "reserve Property", notes = "reserve Property")
    public Response<?> reserveProperty(@RequestPart("jsonValue") @Valid Reserve reserve) {
        String message = propertyProcess.reserveProperty(reserve);
        Response<Reserve> response = new Response<>();
        response.setData(reserve);
        response.setMessage(message);
        if (message.equals("Reserved succeeded!")) {
            response.setCode(HttpStatus.OK.value());
        } else {
            response.setCode(HttpStatus.BAD_REQUEST.value());
        }
        return response;
    }

    /**
     * Get all future reservations.
     * @param customerEmail customer's email
     * @return Response contain of ReserveInfo
     */
    @GetMapping(value = "/customer_future_reservations")
    @ApiOperation(value ="customer future reservations", notes = "customer future reservations")
    public Response<?> viewCustomerFutureReservations(@RequestParam String customerEmail, @RequestParam String curDate) {
        List<ReserveInfo> result = propertyProcess.viewCustomerFutureReservations(customerEmail, curDate);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     * Get all past reservations
     * @param customerEmail customer's email
     * @return response contain of ReserveInfo
     */
    @GetMapping(value = "/customer_past_reservations")
    @ApiOperation(value ="customer past reservations", notes = "customer past reservations")
    public Response<?> viewCustomerPastReservations(@RequestParam String customerEmail, @RequestParam String curDate) {
        List<ReserveInfo> result = propertyProcess.viewCustomerPastReservations(customerEmail, curDate);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     * Get reservations to review.
     * @param customerEmail customer's email
     * @return response contain reservations to review.
     */
    @GetMapping(value = "/reservations_to_review")
    @ApiOperation(value ="customer view reservations to review", notes = "reservations to review")
    public Response<?> viewReservationsToReview(@RequestParam String customerEmail, String curDate) {
        List<ReserveInfo> result = propertyProcess.viewReservationsToReview(customerEmail, curDate);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     * Get owners to review.
     * @param customerEmail customer's email
     * @return response contain owners to review.
     */
    @GetMapping(value = "/owners_to_rate")
    @ApiOperation(value ="customer view owners to rate", notes = "customer view owners to rate")
    public Response<?> viewOwnersToRate(@RequestParam String customerEmail, @RequestParam String curDate) {
        List<ReserveInfo> result = propertyProcess.viewOwnersToRate(customerEmail, curDate);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     *
     * @param ownerEmail owner's email
     * @return
     */
    @GetMapping(value = "/customers_to_rate")
    @ApiOperation(value ="owner view customers to rate", notes = "owner view customers to rate")
    public Response<?> viewCustomersToRate(@RequestParam String ownerEmail, @RequestParam String curDate) {
        List<ReserveInfo> result = propertyProcess.viewCustomersToRate(ownerEmail, curDate);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }


    @PostMapping(value = "/customer_rate_owner")
    @ApiOperation(value ="customer_rate owner", notes = "customer rate owner")
    public Response<?> customerRateOwner(@RequestParam String ownerEmail ,@RequestParam String customerEmail, @RequestParam Integer score) {
        String result = propertyProcess.CustomerRateOwner(ownerEmail, customerEmail, score);
        return new Response<>(HttpStatus.OK.value(), result);
    }

    @PostMapping(value = "/owner_rate_customer")
    @ApiOperation(value ="owner_rate_customer", notes = "owner rate customer")
    public Response<?> ownerRateCustomer(@RequestParam String ownerEmail ,@RequestParam String customerEmail, @RequestParam Integer score) {
        String result = propertyProcess.OwnerRateCustomer(ownerEmail, customerEmail, score);
        return new Response<>(HttpStatus.OK.value(), result);
    }
    /**
     * Get all properties to remove.
     * @param ownerEmail owner's email
     * @return response contain all properties to remove.
     */
    @GetMapping(value = "/properties_to_remove")
    @ApiOperation(value ="properties to remove", notes = "properties to remove")
    public Response<?> viewPropertiesToRemove(@RequestParam String ownerEmail, @RequestParam String curDate) {
        List<Property> result = propertyProcess.viewPropertiesToRemove(ownerEmail, curDate);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }


    /**
     * Cancel property reservation.
     * @param propertyName the property's name.
     * @param ownerEmail the owner Email.
     * @param customerEmail the customer Email.
     * @return Response object
     */
    @PostMapping(value = "/cancel_reservation")
    @ApiOperation(value ="cancel reservation", notes = "cancel reservation")
    public Response<?> cancelPropertyReservation(@RequestParam String propertyName,
                                                 @RequestParam String ownerEmail,
                                                 @RequestParam String customerEmail) {
        String result = propertyProcess.cancelPropertyReservation(propertyName, ownerEmail, customerEmail);
        return new Response<>(HttpStatus.OK.value(), "");
    }

    /**
     * Customer review reservation.
     * @param propertyName property's name
     * @param ownerEmail owner's email
     * @param customerEmail customer's email
     * @param content content
     * @param score score
     * @return Response object
     */
    @PostMapping(value = "/review_reservation")
    @ApiOperation(value ="review reservation", notes = "review reservation")
    public Response<?> reviewReservation(@RequestParam String propertyName,@RequestParam String ownerEmail,
                                         @RequestParam String customerEmail,
                                         @RequestParam(required = false) String content,
                                         @RequestParam Integer score) {

        String result = propertyProcess.reviewReservation(propertyName, ownerEmail, customerEmail, content, score);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success");
    }

    /**
     * Get all property_reservations.
     * @return response contains property reservations.
     */
    @GetMapping(value = "/property_reservations")
    @ApiOperation(value ="property reservations", notes = "property reservations")
    public Response<?> viewPropertyReservations() {
        List<ReserveInfo> result = propertyProcess.viewPropertyReservations();
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success", result);
    }

    /**
     * Owner add property.
     * @param property the property to be added.
     * @param nearestAirport the nearest airport.
     * @param distance the distance to the airport.
     * @return response indicates success or not.
     */
    @PostMapping(value = "/owner_add_property")
    @ApiOperation(value = "owner add property")
    public Response<?> ownerAddProperty(@RequestPart("jsonValue") Property property,
                                        @RequestParam(required = false) String nearestAirport,
                                        @RequestParam(required = false) Integer distance) {

        PropertyInfo propertyInfo = propertyProcess.addProperty(property, nearestAirport, distance);
        String message = propertyInfo.getMessage();
        if (message.equals("Successfully added this property!")) {
            return new Response<>(200, message, propertyInfo);
        } else {
            return new Response<>(400, message);
        }
    }

    /**
     *  Owner remove property.
     * @param propertyName property's name
     * @param ownerEmail owner's email
     * @return response indicates success or not.
     */
    @GetMapping(value = "/remove_property")
    @ApiOperation(value ="remove property", notes = "owner remove property")
    public Response<?> removeProperty(@RequestParam String propertyName,
                                      @RequestParam String ownerEmail) {

        String result = propertyProcess.removeProperty(propertyName, ownerEmail);
        System.out.println(result);
        return new Response<>(HttpStatus.OK.value(), "Success");
    }
}

