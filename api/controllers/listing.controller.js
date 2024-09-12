import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) =>{
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)

    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if(!listing){
        return next(errorHandler(404, 'Listing not found!'));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listings!'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('listing has been deleted')
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if(!listing){
        return next(errorHandler(404, 'Listing not found!'))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own listings!'))
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        )
        res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    try {
        if(!listing){
            return next(errorHandler(404, 'Listing not found!'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const getRandom = async (req, res, next) => {
    try {
      const listings = await Listing.aggregate([{ $sample: { size: 4 } }]);
      if (!listings || listings.length === 0) {
        return next(errorHandler(404, 'Listings not found!'));
      }
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  }

  export const searchListing = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }else if(offer === 'true'){
            offer = true
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }else if(furnished === 'true'){
            furnished = true
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }else if(parking === 'true'){
            parking = true
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1; // 'asc' for 1 and 'desc' for -1

        const listings = await Listing.aggregate([
            {
                $match: {
                    name: { $regex: searchTerm, $options: 'i' },
                    offer,
                    furnished,
                    parking,
                    type,
                },
            },
            {
                $addFields: {
                    effectivePrice: {
                        $cond: {
                            if: { $eq: ['$offer', true] }, // Check if `offer` is true
                            then: '$discountedPrice',
                            else: '$regularPrice',
                        },
                    },
                },
            },
            {
                $sort: {
                    [sort === 'regularPrice' ? 'effectivePrice' : sort]: order, // Sort by `effectivePrice` if sorting by price
                },
            },
            {
                $skip: startIndex,
            },
            {
                $limit: limit,
            },
        ]);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}