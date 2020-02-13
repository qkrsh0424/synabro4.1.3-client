import React from 'react';
import styled from "styled-components";
import SearchContact from "./SearchContact";
import ContactCategoryBody from "./ContactCategoryBody";

import Axios from "axios";

import AuthKey from '../../../config/AuthorizationKey';
import { serverUrl } from '../../../config/serverUrl';

import Nav from '../../Nav/Nav';
class ContactCategoryMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactVals: null,
            searchTerm: "",
            loading: false,
            contact: null
        };
        this.updateTerm = this.updateTerm.bind(this);
        this._getSearchContactID = this._getSearchContactID.bind(this);
        this._getContactId = this._getContactId.bind(this);
    }

    async componentDidMount() {
        await this._getContactId();
    }
    async _getSearchContactID(term) {
        return await Axios.get(
            `${serverUrl}/api/contact/get_search_contact`,
            {
                params: {
                    writeData: encodeURIComponent(term)
                },
                headers: {
                    Authorization: 'Bearer ' + AuthKey
                }
            }
        )
            .then(res => res.data)
    }

    async _getContactId() {
        return await Axios.get(`${serverUrl}/api/contact/get_contact`, {
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'success') {
                    this.setState({ contact: data.data });
                } else {
                    alert('page error');
                    window.location.href = '/';
                }
            })
    }




    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    };

    async updateTerm(event) {
        const {
            target: { value }
        } = event;
        await this.setState({
            searchTerm: value
        });
        await this.searchByTerm();
    };

    searchByTerm = async () => {
        this._getSearchContactID();
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const contactVals = await this._getSearchContactID(searchTerm);
            // console.log(contactVals);
            this.setState({
                contactVals
            });
            // console.log(contactVals)

        } catch {
            this.setState({ error: "Can't find results." });
        } finally {
            this.setState({ loading: false });
        }
    };
    render() {
        return (
            <>
                <Nav/>
                <ContactCategoryBody
                    contact={this.state.contact}
                    contactVals={this.state.contactVals}
                    searchTerm={this.state.searchTerm}
                    loading={this.state.loading}
                    handleSubmit={this.handleSubmit}
                    updateTerm={this.updateTerm}
                    writeData={this.state.writeData}
                />
            </>
        );
    }
}

export default ContactCategoryMain;