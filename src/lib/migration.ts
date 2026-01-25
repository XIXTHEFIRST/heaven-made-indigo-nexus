import { supabase } from './supabase';
import { Event, Sponsor, MyEvent } from '@/types/intelligence';

export const migrateFromLocalStorage = async (userId: string) => {
    const storageKey = 'intelligence-storage';
    const rawData = localStorage.getItem(storageKey);

    if (!rawData) return { success: true, message: 'No local data to migrate' };

    try {
        const data = JSON.parse(rawData);
        const { state } = data;

        if (!state) return { success: true, message: 'No state found in local data' };

        // 1. Migrate Sponsors
        if (state.sponsors && state.sponsors.length > 0) {
            const sponsorsToMigrate = state.sponsors.map((s: Sponsor) => ({
                id: s.id,
                name: s.name,
                industry: s.industry,
                logo: s.logo,
                description: s.description,
                website: s.website,
                contact_email: s.contactEmail,
                contact_phone: s.contactPhone,
                total_sponsorship: s.totalSponsorship,
                total_investment_budget: s.totalInvestmentBudget,
                average_roi: s.averageROI,
                preferred_tiers: s.preferredTiers,
                target_demographics: s.targetDemographics,
                active_since: s.activeSince,
                internal_notes: s.internalNotes,
                intel: s.intel,
            }));

            const { error: sponsorError } = await supabase
                .from('sponsors')
                .upsert(sponsorsToMigrate, { onConflict: 'id' });

            if (sponsorError) console.error('Error migrating sponsors:', sponsorError);
        }

        // 2. Migrate Events
        if (state.events && state.events.length > 0) {
            const eventsToMigrate = state.events.map((e: Event) => ({
                id: e.id,
                name: e.name,
                date: e.date,
                location: e.location,
                venue: e.venue,
                type: e.type,
                status: e.status,
                estimated_attendance: e.estimatedAttendance,
                actual_attendance: e.actualAttendance,
                demographics: e.demographics,
                success_metrics: e.successMetrics,
                analysis: e.analysis,
                autopsy_report: e.autopsyReport,
                budget: e.budget,
                media_metrics: e.mediaMetrics,
                tags: e.tags,
                description: e.description,
                organizer: e.organizer,
                image_url: e.imageUrl,
                banner_image: e.bannerImage,
                recurring: e.recurring,
                previous_editions: e.previousEditions,
                verification: e.verification,
                created_by: userId,
            }));

            const { error: eventError } = await supabase
                .from('events')
                .upsert(eventsToMigrate, { onConflict: 'id' });

            if (eventError) console.error('Error migrating events:', eventError);

            // 3. Migrate Sponsorships (from nested intelSponsors)
            for (const event of state.events) {
                if (event.intelSponsors && event.intelSponsors.length > 0) {
                    const sponsorships = event.intelSponsors.map((s: any) => ({
                        event_id: event.id,
                        sponsor_id: s.sponsorId,
                        tier: s.tier,
                        deal_amount: s.dealAmount,
                        deliverables: s.deliverables,
                    }));

                    const { error: sError } = await supabase
                        .from('sponsorships')
                        .upsert(sponsorships);

                    if (sError) console.error(`Error migrating sponsorships for event ${event.id}:`, sError);
                }
            }
        }

        // 4. Migrate MyEvents
        if (state.myEvents && state.myEvents.length > 0) {
            const myEventsToMigrate = state.myEvents.map((me: MyEvent) => ({
                id: me.id,
                user_id: userId,
                name: me.name,
                type: me.type,
                target_audience: me.targetAudience,
                budget_goal: me.budgetGoal,
                currency: me.currency,
                unique_angle: me.uniqueAngle,
                status: me.status,
                ai_recommendations: me.aiRecommendations,
            }));

            const { error: myEventError } = await supabase
                .from('my_events')
                .upsert(myEventsToMigrate, { onConflict: 'id' });

            if (myEventError) console.error('Error migrating my_events:', myEventError);
        }

        // After migration, we can clear the local storage or mark it as migrated
        // localStorage.removeItem(storageKey); 
        // Usually safer to just mark it or let the user know.

        return { success: true, message: 'Migration completed successfully' };
    } catch (error: any) {
        console.error('Migration failed:', error);
        return { success: false, message: error.message };
    }
};
